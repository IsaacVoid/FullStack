export default function Modal({ texto, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <span className="cerrar" onClick={onClose}>&times;</span>
        <p>{texto}</p>
      </div>
    </div>
  );
}
