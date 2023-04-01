import platform
import hashlib
import psutil
import subprocess
import re
import socket

def get_device_id():
    # Combina información del hardware y del sistema operativo
    unique_info = platform.machine() + platform.system() + platform.processor() + \
                  platform.node() + platform.release() + platform.version() + socket.gethostname()
                  
    # Calcula el hash SHA-256 de la información única
    device_id = hashlib.sha256(unique_info.encode('utf-8')).hexdigest()
    return device_id


def get_device_info():
    # Información del sistema operativo
    os_name = platform.system()

    # Dirección IP
    ip_address = subprocess.check_output(['hostname', '-I']).decode().split()[0]

    # Información de la CPU
    cpu_info = platform.processor()
    cpu_cores = psutil.cpu_count(logical=True)
    cpu_speed = psutil.cpu_freq().max

    # Información de la memoria RAM
    ram_info = psutil.virtual_memory()
    ram_total = round(ram_info.total / (1024.0 ** 3), 2)

    # Información del almacenamiento
    storage_info = psutil.disk_usage('/')
    storage_total = round(storage_info.total / (1024.0 ** 3), 2)

    # Información de la GPU
    gpu_info = subprocess.check_output(['lspci']).decode()
    gpu_match = re.search('VGA compatible controller: (.*)\n', gpu_info)
    gpu_model = gpu_match.group(1) if gpu_match else ''
    gpu_memory = 0

    return {
        'ipAddress': ip_address,
        'description': platform.node(),
        'gpuModel': gpu_model,
        'gpuMemory': gpu_memory,
        'cpuModel': cpu_info,
        'cpuCores': cpu_cores,
        'cpuSpeed': cpu_speed,
        'ram': ram_total,
        'storage': storage_total,
        'os': os_name,
        'name': socket.gethostname()
    }
