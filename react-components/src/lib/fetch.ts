const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get<D>(url: string) {
  const requestOptions = {
    method: 'GET',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<D>(response);
}

async function post<D, B>(url: string, body: B) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<D>(response);
}

async function put<D, B>(url: string, body: B) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<D>(response);
}

async function _delete<D>(url: string) {
  const requestOptions = {
    method: 'DELETE',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<D>(response);
}

async function handleResponse<D>(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data as D;
}

export default fetchWrapper;
