import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}
const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "200px",
        opacity: 1,
        transition: {
            delay: 0.5
        }
    }
}

const Modal = ({ showModal, setShowModal }) => {
    return (
        <AnimatePresence existBeforeEnter>
            {
                showModal && (
                    <motion.div className="backdrop"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div className="modal"
                            variants={modal}
                        >
                            <p>Tem certeza do seu pedido?</p>
                            <div className="btns-modal">
                                <Link to="/base">
                                    <button onClick={() => setShowModal(false)}>Mudar</button>
                                </Link>
                                <Link to="/">
                                    <button onClick={() => setShowModal(false)}>Encerrar</button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Modal