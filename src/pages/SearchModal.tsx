import React, { useState } from 'react';
import SearchModal from "../Components/Common/MemberViewDetails"
const SomePage = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            {/* Qolgan kodlar */}
            <SearchModal isOpen={open} toggleModal={toggleModal} />
        </React.Fragment>
    );
};

export default SomePage;
