import React from 'react'

import { Container } from 'reactstrap'
import BreadCrumb from 'Components/Common/BreadCrumb'
import TasksKanban from './MainPage'




const 탈퇴회원목록 = () => {

    document.title = "탈퇴회원목록 | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="탈퇴회원목록" pageTitle="Tasks" />
                    <TasksKanban />
                </Container>
            </div>
        </React.Fragment>


    )
}

export default 탈퇴회원목록