
import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import './App.css';

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div class="scroll">
            <FaArrowCircleUp onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} />
        </div>
    );
}

export default ScrollToTop;