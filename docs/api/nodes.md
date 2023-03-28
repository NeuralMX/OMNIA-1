Información agregada al modelo Node
-----------------------------------

En este modelo hemos agregado información relevante acerca de cada nodo en la supercomputadora distribuida. A continuación, se explican las razones por las cuales consideramos que cada campo es valioso.

*   `gpuModel`: Conocer el modelo de la GPU instalada en el nodo puede ser útil para identificar las capacidades de procesamiento gráfico del nodo y, por lo tanto, asignar trabajos que requieren más o menos recursos de GPU según sea necesario.
*   `gpuMemory`: La cantidad de memoria de la GPU instalada en el nodo puede ser útil para identificar la capacidad de procesamiento gráfico del nodo y asignar trabajos que requieran diferentes cantidades de memoria de GPU.
*   `gpuTemperature`: Conocer la temperatura de la GPU puede ser importante para asegurarse de que no se sobrecaliente y se dañe el nodo.
*   `cpuModel`: Conocer el modelo de la CPU instalada en el nodo puede ser útil para identificar las capacidades de procesamiento de la CPU del nodo y, por lo tanto, asignar trabajos que requieran más o menos recursos de CPU según sea necesario.
*   `cpuCores`: La cantidad de núcleos de la CPU instalada en el nodo puede ser útil para identificar la capacidad de procesamiento de la CPU del nodo y asignar trabajos que requieran diferentes cantidades de núcleos de CPU.
*   `cpuSpeed`: La velocidad de reloj de la CPU instalada en el nodo puede ser útil para identificar la velocidad de procesamiento de la CPU del nodo y asignar trabajos que requieran más o menos velocidad de procesamiento de CPU según sea necesario.
*   `ram`: La cantidad de memoria RAM disponible en el nodo puede ser útil para identificar la capacidad de memoria del nodo y asignar trabajos que requieran diferentes cantidades de memoria RAM.
*   `storage`: La cantidad de espacio de almacenamiento disponible en el nodo puede ser útil para identificar la capacidad de almacenamiento del nodo y asignar trabajos que requieran diferentes cantidades de espacio de almacenamiento.
*   `os`: Conocer el sistema operativo instalado en el nodo puede ser útil para asegurarse de que los trabajos se ejecuten correctamente en el entorno operativo adecuado.