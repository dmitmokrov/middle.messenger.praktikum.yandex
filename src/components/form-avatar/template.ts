export const template = `
  <label class="form-avatar__label">
    <span class="visually-hidden">{{ label }}</span>
    {{{ avatar }}}
    <input
      class="visually-hidden"
      id={{ id }}
      name={{ name }}
      type="file"
    >
  </label>
`;
