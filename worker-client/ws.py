import socketio

class SocketIOClient:
    def __init__(self, url, on_message):
        # Crea una instancia del cliente socket.io
        self.sio = socketio.Client()
        self.url = url

        # Define una función que se ejecutará cuando se conecte al servidor
        @self.sio.event
        def connect():
            print('Conectado al servidor')

        # Define una función que se ejecutará cuando se reciba un mensaje desde el servidor
        @self.sio.on('1')
        def on_prepare_task(data):
            on_message('1', data)
            
        @self.sio.on('2')
        def on_start_task():
            on_message('2', {})

    def connect(self):
        # Conéctate al servidor
        self.sio.connect(self.url)

    def send_message(self, message):
        # Envía un mensaje al servidor
        self.sio.emit('mensaje desde el cliente', {'mensaje': message})

    def wait(self):
        # Espera a que se reciban mensajes desde el servidor
        self.sio.wait()
