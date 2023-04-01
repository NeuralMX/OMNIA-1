import json
from http_client import HTTPClient

class Task:
    def __init__(self, client: HTTPClient, data) -> None:
        self.client = client
        self.data = data
        
    def update_status(self, new_status):
        print(json.dumps(self.data))
        id = self.data.get('id') # type: ignore
        res = self.client.patch(f'tasks/{id}/update-status', json={ 'status': new_status }) 
        print(res.text)