import React, { Component } from 'react';

class BoxPlayer extends Component {
    componentDidMount(){
            this.tocando = this.props.situacao;
            let DZ = window.DZ;
            this.DZ = window.DZ;

            window.DZ.init({
                appId  : 'MuramatsuRadio',
                channelUrl : 'http://localhost:3000/channel.html',
                player: {
                    container: 'dz-root',
                    onload : function(){
                        // DZ.player.playTracks([3590194]);
                    }
                }
            });

    }
    toggleAudio(){
        if(this.toggleAudio)
            this.DZ.player.pause()
        else
            this.DZ.player.play();

        this.tocando = !this.tocando;
    }
    render(){

           return (
                <div>
                    <div className="playerContainer">
                        <div className="columns">
                            <div className="column is-2">
                                <button className="button is-primary" onClick={this.toggleAudio}>
                                    {`${this.props.situacao ? 'Pausar' : 'Play'}`}
                                </button>
                            </div>
                            <div className="column is-10"></div>
                        </div>
                    </div>
                    <div  id="dz-root"></div>
                </div>
            )
    }
}
/*
const BoxPlayer = (props) => {
  /*  console.log('Teste:', window.DZ);
    
    return (
        <div>
            <div id="dz-root2"></div>

        </div>
    )
}*/

export default BoxPlayer;