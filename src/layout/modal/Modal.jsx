import './Modal.css'

export default function Modal({title, handleClose, isOpen, children}){
    
    if(!isOpen) return; 
    // Si isOpen es false, no se renderiza nada

    return(
        <div className="modal-overlay" onClick={handleClose}> {/* Para que se cierre el modal al clickear fuera */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Para que no se cierre el modal al clickear dentro */}
                <div className="modal-header">
                    {title}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}