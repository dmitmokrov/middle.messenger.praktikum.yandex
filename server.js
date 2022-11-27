const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(`${__dirname}/dist`));
app.use('*', (req, res) => res.status(200).sendFile(`${__dirname}/dist/index.html`));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
