import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          // os headers são basicamente alguns trechos de texto, que são como informações sobre a própria solicitação.
          headers: {
            'Content-Type': 'application/json',
          },
          // o que vamos enviar
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // utilizamos Promise.race para ver qual promise chegará primeiro
    // prettier-ignore
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // Estamos pegando o objeto err e simplesmente lançar de novo o erro.
    // Está lançando o erro novamente, para poder usá-lo no controller.js
    throw err;
  }
};

/*
export const getJSON = async function (url) {};

export const sendJSON = async function (url, uploadData) {
  try {
    // pegando a saída da receita

    // utilizamos Promise.race para ver qual promise chegará primeiro
    // prettier-ignore
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // Estamos pegando o objeto err e simplesmente lançar de novo o erro.
    // Está lançando o erro novamente, para poder usá-lo no controller.js
    throw err;
  }
};
*/
