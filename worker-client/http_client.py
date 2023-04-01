import requests
import json

class HTTPClient:
    def __init__(self, base_url, auth_token=None):
        self.base_url = base_url
        self.auth_token = auth_token
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
        if auth_token is not None:
            self.session.headers.update({'Authorization': f'Bearer {auth_token}'})

    def get(self, endpoint, **kwargs):
        return self._request('GET', endpoint, **kwargs)

    def post(self, endpoint, data=None, json=None, **kwargs):
        return self._request('POST', endpoint, data=data, json=json, **kwargs)

    def put(self, endpoint, data=None, **kwargs):
        return self._request('PUT', endpoint, data=data, **kwargs)
    
    def patch(self, endpoint, json=None, **kwargs):
        return self._request('PATCH', endpoint, json=json, **kwargs)

    def delete(self, endpoint, **kwargs):
        return self._request('DELETE', endpoint, **kwargs)

    def _request(self, method, endpoint, **kwargs):
        url = f'{self.base_url}/{endpoint}'
        if self.auth_token is not None:
            print(f"Setting auth token to: {self.auth_token}")
            self.session.headers.update({'Authorization': f'Bearer {self.auth_token}'})
        response = self.session.request(method, url, **kwargs)
        if response.status_code == 401:
            self._handle_unauthorized()
        response.raise_for_status()
        return response
      
    def login(self, hash):
      res = self.post('auth/login', json={'hash': hash})
      response_data = json.loads(res.text)
      return response_data['token']
  
    def set_jwt(self, jwt):
        self.auth_token = jwt

    def _handle_unauthorized(self):
        # Implementar lógica para renovar el token de autenticación
        # y volver a intentar la solicitud fallida
        pass
