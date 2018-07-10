import React from 'react';

class Contact extends React.Component {
    render() {
        return (
            <section id="contact">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h2 className="section-heading">Let's Get In Touch!</h2>
                        <hr className="my-4" />
                        <p className="mb-5">Have some questions about our project? That's great! Give us a call or send us an email and we will get back to you as soon as possible!</p>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 ml-auto text-center">
                        <i className="fa fa-phone fa-3x mb-3 sr-contact"></i>
                        <p>201-616-8689</p>
                    </div>
                    <div className="col-lg-4 mr-auto text-center">
                        <i className="fa fa-envelope-o fa-3x mb-3 sr-contact"></i>
                        <p>
                        <a href="mailto:your-email@your-domain.com">jpeng7@stevens.edu</a>
                        </p>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Contact;