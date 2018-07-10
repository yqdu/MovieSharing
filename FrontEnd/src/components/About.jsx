import React from 'react';
import '../style/css/Portrait.css';

class About extends React.Component {
    render() {
        return (
            <section className="bg-primary" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="section-heading text-white">Team members</h2>
                            <hr className="light my-4" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <img className="portrait Jiawen" src="https://img0.etsystatic.com/203/0/7976576/il_570xN.1313475884_m5b9.jpg" />
                            <h3 className="mb-3">Jiawen Peng</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <img className="portrait Jiawen" src="https://img1.etsystatic.com/207/0/7976576/il_570xN.1360738213_l3t4.jpg" />
                            <h3 className="mb-3">Yi Ding</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <img className="portrait Jiawen" src="https://img1.etsystatic.com/191/0/7976576/il_570xN.1360737701_fc6x.jpg" />
                            <h3 className="mb-3">Yaoqi Du</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <img className="portrait Jiawen" src="https://img1.etsystatic.com/185/0/7976576/il_570xN.1359095849_gus1.jpg" />
                            <h3 className="mb-3">YunanDai</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default About;