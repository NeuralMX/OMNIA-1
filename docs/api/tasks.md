A continuación se presenta la documentación relacionada con el modelo `Task` actualizado con los cambios necesarios para identificar el tipo de tarea que se va a realizar y permitir el envío de código y cargas útiles a los nodos.

Modelo Task
===========

El modelo `Task` representa una tarea que se puede ejecutar en un nodo en la red. Cada tarea tiene una descripción, un estado, un tipo y un identificador de nodo al que se asigna la tarea. Además, el campo `code` permite enviar código y el campo `payload` permite enviar cargas útiles a los nodos.

Campos
------

| Campo        | Tipo        | Descripción                                                                 |
| ------------ | ----------- | --------------------------------------------------------------------------- |
| id           | String      | Identificador único de la tarea.                                            |
| description  | String      | Descripción de la tarea.                                                    |
| status       | TaskStatus  | Estado actual de la tarea (pendiente, en progreso, completada).             |
| node         | Node        | Nodo al que se asigna la tarea.                                              |
| nodeId       | String      | Identificador del nodo al que se asigna la tarea.                            |
| type         | TaskType    | Tipo de tarea que se va a realizar.                                          |
| code         | String      | Código que se debe ejecutar en el nodo para realizar la tarea (opcional).    |
| payload      | String      | Carga útil que se debe enviar al nodo junto con la tarea (opcional).         |


Tipos de tarea
--------------

El campo `type` permite identificar el tipo de tarea que se va a realizar. Los siguientes tipos de tarea están disponibles:

*   `inference`: Se utiliza para realizar inferencia en un modelo de aprendizaje automático pre-entrenado. Se espera que el campo `code` contenga el código necesario para cargar el modelo y realizar la inferencia.
*   `training`: Se utiliza para entrenar un modelo de aprendizaje automático. Se espera que el campo `code` contenga el código necesario para cargar los datos y entrenar el modelo.
*   `fine_tuning`: Se utiliza para afinar un modelo de aprendizaje automático existente. Se espera que el campo `code` contenga el código necesario para cargar el modelo existente y los nuevos datos de entrenamiento.
*   `execute_code`: Se utiliza para ejecutar cualquier otro tipo de código en el nodo. Se espera que el campo `code` contenga el código a ejecutar.

Se pueden agregar más tipos de tarea según sea necesario para cubrir otros casos de uso.

Ejemplo de uso
--------------

El siguiente es un ejemplo de uso de un objeto `Task`:

```json
{
  "id": "abc123",
  "description": "Realizar inferencia en un modelo pre-entrenado",
  "status": "in_progress",
  "node": {
    "id": "xyz789",
    "name": "Nodo 1",
    "ipAddress": "192.168.0.1",
    "description": "Este es el nodo 1 de la red."
  },
  "nodeId": "xyz789",
  "type": "inference",
  "code": "import tensorflow as tf\nmodel = tf.keras.models.load_model('model.h5')\nresults = model.predict(data)",
  "payload": "{\"data\": [0.2, 0.5, 0.3]}"
}
```

En este ejemplo, se está realizando una tarea de inferencia en un modelo pre-entrenado en un nodo con el identificador `xyz789`. El campo `code`