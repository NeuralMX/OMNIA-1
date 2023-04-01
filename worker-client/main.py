import click
import json
from http_client import HTTPClient
from device import get_device_id, get_device_info
from ws import SocketIOClient
from task import Task

config = {}
current_task = None
global client

def read_config():
  try:
    with open('config.json', 'r') as f:
      return json.load(f)
  except FileNotFoundError:
    return {}

def write_config(config):
  with open('config.json', 'w') as f:
    json.dump(config, f)

def ensure_token():
    if "token" not in config:
        token = get_token()
        config["token"] = token
        write_config(config)
        click.echo("Token guardado exitosamente.")

def get_token():
  token = click.prompt("Por favor ingrese su token", hide_input=True)
  return token

def login():
  jwt = client.login(config.get('token'))
  config["jwt"] = jwt
  write_config(config)
  
def on_message(message_type, payload):
  click.echo(f"Received a message_type={message_type} with payload: {payload}")
  
  match message_type:
    # HealthCheck
    case '0':
      click.echo("HealthCheck requested...")
      # TODO: Send POST request to update the node health check
    
    # PrepareTask
    case '1':
      global current_task
      current_task = Task(client, payload)
      click.echo(json.dumps(current_task.data, indent=2))
      
    # Start Task
    case '2':
      current_task.update_status('in_progress') # type: ignore
        

@click.command()
def display_menu():
  click.echo("1. Autenticarse")
  click.echo("2. Enviar información del nodo")
  click.echo("3. Escuchar por tareas, ejecutarlas y reportar estados")
  click.echo("4. Obtener ID del nodo")
  click.echo("5. Obtener información del dispositivo")
  click.echo("6. Obtener nodo por deviceId")
  click.echo("7. Conectar por WebSocket")
  
  option = click.prompt("Por favor seleccione una opción")
  
  match option:
    case '1':
      login()
      
    case '2':
      nodeId = get_device_id()
      device_info = get_device_info()
      
      res = client.post('nodes', json={
        **device_info,
        'deviceId': nodeId
      })
      
      click.echo(res.text)
      
    case '4':
      nodeId = get_device_id()
      click.echo(f"Unique Device ID = {nodeId}")
      
    case '5':
      device_info = get_device_info()
      click.echo("Device Info:")
      click.echo(json.dumps(device_info, indent=2))
      
    case '6':
      device_id = get_device_id()
      click.echo(f"Obteniendo Node con deviceId={device_id}")
      res = client.get(f"nodes/findByDeviceId/{device_id}")
      node = json.loads(res.text)
      config['node'] = node
      click.echo("Nodo cargado correctamente!")
      click.echo(json.dumps(node, indent=2))
      
    case '7':
      if not "ws_url" in config:
        return click.echo("El valor 'ws_url' no está en el archivo 'config.json'")
      
      ws_client = SocketIOClient(config.get('ws_url'), on_message)
      ws_client.connect()
      ws_client.wait()
      
    
    case _:
      click.echo('Comando no encontrado...')
      display_menu()
      
@click.group()
def cli():
  pass

cli.add_command(display_menu)

def setup_http_client():
    base_url = config.get('base_url')
    auth_token = config.get('token')
    
    if base_url is None:
        raise ValueError('El valor base_url no está definido en config.json')
      
    return HTTPClient(base_url, auth_token)

if __name__ == "__main__":
  click.echo("Bienvenido a OMNIA-1 Worker Client")
  config = read_config()
  
  ensure_token()
  client = setup_http_client()
  login()
  client.set_jwt(config.get("jwt"))
  
  if not "jwt"in config:
    click.echo("JWT no encontrado!")
  
  display_menu()
  cli()
