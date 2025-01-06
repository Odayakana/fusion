function Popup({children, popOpen, close}) {

    return (

        <div className={`popup offer-popup ${popOpen ? 'active' : ''}`}>

            <div className="pop-content">
                <button
                    type="button"
                    className="pop-close icon-s-cross"
                    onClick={() => {close()}}
                />
                {children}
            </div>

        </div>

    )
}

export {Popup}
