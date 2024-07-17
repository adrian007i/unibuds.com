import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import "./chats.css"
import "./chat.css";
import profilepic from '../../icons/Alia.jpg';
const Chat = ({ errors, isPending }) => {



    return (
        <>
            <div className="user">
                <NavLink className='chat chat_small' to="/chat/1234567890">
                    <div className='propic'><img src={profilepic} alt="" /></div>
                    <div className='name'>Alia</div>
                </NavLink>
            </div>

            <div className="messages">
                <div className='msg recieve'>Hello Adrian How are you</div>
                <div className='msg send'>Hi Alia</div>
                <div className='msg recieve'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam corporis dicta ea accusamus placeat? Dolores quaerat dolorem eos libero ad suscipit obcaecati eligendi possimus dicta sunt cumque nesciunt earum doloribus eaque esse, fugiat et laborum doloremque consequuntur accusamus nam voluptas perspiciatis. Suscipit neque, aut non nobis excepturi assumenda. Nobis voluptas sint corporis iure incidunt perferendis, quis assumenda itaque commodi cumque dicta harum praesentium eos perspiciatis quod! Vitae consequuntur, optio aspernatur illo veritatis provident! Magni dolore nihil qui, cum, voluptatibus repellendus deserunt officiis possimus molestiae iste quibusdam aperiam voluptate corrupti sint modi fugiat! Consequuntur, labore quis ea neque velit eius.</div>
                <div className='msg recieve'>Hello Adrian How are you</div>
                <div className='msg send'>Hi Alia</div>
                <div className='msg recieve'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam corporis dicta ea accusamus placeat? Dolores quaerat dolorem eos libero ad suscipit obcaecati eligendi possimus dicta sunt cumque nesciunt earum doloribus eaque esse, fugiat et laborum doloremque consequuntur accusamus nam voluptas perspiciatis. Suscipit neque, aut non nobis excepturi assumenda. Nobis voluptas sint corporis iure incidunt perferendis, quis assumenda itaque commodi cumque dicta harum praesentium eos perspiciatis quod! Vitae consequuntur, optio aspernatur illo veritatis provident! Magni dolore nihil qui, cum, voluptatibus repellendus deserunt officiis possimus molestiae iste quibusdam aperiam voluptate corrupti sint modi fugiat! Consequuntur, labore quis ea neque velit eius.</div>
                <div className='msg recieve'>Hello Adrian How are you</div>
                <div className='msg send'>Hi Alia</div>
                <div className='msg recieve'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam corporis dicta ea accusamus placeat? Dolores quaerat dolorem eos libero ad suscipit obcaecati eligendi possimus dicta sunt cumque nesciunt earum doloribus eaque esse, fugiat et laborum doloremque consequuntur accusamus nam voluptas perspiciatis. Suscipit neque, aut non nobis excepturi assumenda. Nobis voluptas sint corporis iure incidunt perferendis, quis assumenda itaque commodi cumque dicta harum praesentium eos perspiciatis quod! Vitae consequuntur, optio aspernatur illo veritatis provident! Magni dolore nihil qui, cum, voluptatibus repellendus deserunt officiis possimus molestiae iste quibusdam aperiam voluptate corrupti sint modi fugiat! Consequuntur, labore quis ea neque velit eius.</div>

                <br /><br />
            </div>

            <div className="msg_box">
                <div className="msg_box_flex">
                    <Input className='input_msg' placeholder='Enter Message Here'></Input>
                    <Button className='send'>Send</Button>
                </div>
            </div>






        </>
    );
}





const mapStateToProps = state => ({
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, {})(Chat);