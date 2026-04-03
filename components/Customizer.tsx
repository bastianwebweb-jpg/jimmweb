// Esquema lógico para tu sistema de personalización
export default function Customizer() {
  const MAX_WIDTH_CM = 30;
  const MAX_HEIGHT_CM = 100;

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-10 bg-[#050505] text-white">
      {/* Área de Previsualización */}
      <div className="relative border-2 border-dashed border-red-500/30 bg-[#111] w-[300px] h-[600px] mx-auto overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)]">
        <div className="absolute top-2 left-2 text-[10px] text-red-500 font-black uppercase italic">
          Zona de Impresión: 30cm x 100cm
        </div>
        
        {/* Aquí iría el componente de arrastrar y soltar (Drag & Drop) */}
        <div className="flex items-center justify-center h-full opacity-20 italic">
          Sube tu arsenal aquí
        </div>
      </div>

      {/* Controles de Configuración */}
      <div className="flex-1 space-y-6">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Configura tu <span className="text-red-500">Drop</span></h2>
        
        <div className="bg-[#151515] p-6 border-l-4 border-red-600">
          <h3 className="font-bold uppercase mb-2">Reglas de la Calle:</h3>
          <ul className="text-xs text-gray-400 space-y-2 uppercase tracking-wider">
            <li>• Máximo 30cm de ancho (No queremos que el diseño se pierda en las axilas).</li>
            <li>• Altura máxima de 1 metro para composiciones verticales.</li>
            <li>• Formato sugerido: PNG transparente o SVG.</li>
          </ul>
        </div>

        <button className="w-full bg-red-600 hover:bg-white hover:text-black py-6 font-black uppercase text-2xl skew-x-[-10deg] transition-all">
          ENVIAR A PRODUCCIÓN
        </button>
      </div>
    </div>
  )
}