/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line max-classes-per-file
import { PropsType } from '../base/Component';
import EventBus from '../base/EventBus';
import { isEqual } from '../utils/isEqual';

export enum StoreEvent {
  UPDATED = 'UPDATED',
}

export type StateType = {
  isAuth: boolean;
  user: {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string | null;
    id: number | null;
  };
  chats: Object[];
  chatMessages: Object[];
  socket: WebSocket | null;
  [k: string]: unknown;
};

const initialState: StateType = {
  isAuth: false,
  user: {
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: null,
    id: null,
  },
  chats: [],
  chatMessages: [],
  socket: null,
};

class Store extends EventBus {
  #state: StateType = {
    isAuth: !!localStorage.getItem('isAuth'),
    user: JSON.parse(localStorage.getItem('user') as string),
    chats: JSON.parse(localStorage.getItem('chats') as string) || [],
    chatMessages: [],
    socket: null,
  };

  getState() {
    return this.#state;
  }

  setState(path: string, value: unknown) {
    set(this.#state, path, value);
    this.emit(StoreEvent.UPDATED);
  }

  reset() {
    this.#state = initialState;
  }
}

const store = new Store();
export default store;

type ComponentType<T = any> = new (...args: any[]) => T;

export const connect =
  (mapStateToProps: (state: StateType) => Partial<StateType>) =>
  (ComponentClass: ComponentType) =>
    class extends ComponentClass {
      constructor(props: PropsType) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        store.on(StoreEvent.UPDATED, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };

type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}
