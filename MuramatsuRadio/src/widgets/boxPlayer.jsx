import React, { Component } from 'react';
import {format_hour } from '../util/helper'

class BoxPlayer extends Component {
    constructor(){
        super();

        this.state = { progressbar: 0 , tempo_atual:'00:00'}
    }
    componentDidMount(){
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

       let home_class = this;

        DZ.Event.subscribe('player_position', function(arg){

            let perc = (100*arg[0]/arg[1]) || 0;
            if(perc == 0)
                home_class.props.atualizar();
            
            home_class.setState({...home_class, progressbar: perc, tempo_atual: format_hour(parseInt(arg[0],10))})
        });

        DZ.Event.subscribe('player_loaded', function() {
            //console.log(home_class.props.musica_atual)
            // if(home_class.props.musica_atual != undefined)
			console.log('fim')
		});

    }


    render(){

           return (
                <div>
                    <div className="playerContainer">
                        {/*<div className="">
                            <div className="">
                                <img src="http://api.deezer.com/album/339677/image" style={styles.playerImage}/>

                                <div style={styles.controls}>
                                    <button className="" onClick={this.toggleAudio} style={styles.btnBack}>
                                        {'<'}
                                    </button>
                                    <button className="" onClick={this.toggleAudio} style={styles.btnPlay}>
                                        Play
                                    </button>
                                    <button className="" onClick={this.toggleAudio} style={styles.btnForward}>
                                        {'>'}
                                    </button>
                                </div>
                            </div>
                        </div>*/}
                        <article className="media" style={{position:'relative'}}>
                            <div className="">
                                <figure className="image is-64x64">
                                    <img src={this.props.cover} style={styles.playerImage}/>             
                                </figure>
                            </div>
                            <div className="">
                                <div className="content">                             
                                    <div style={styles.btnPlay} onClick={this.props.play} >
                                        &nbsp;
                                        <span style={{marginLeft:7}}></span>
                                        <i className={`fa fa-fw fa-${this.props.tocando ? 'pause' : 'play'}`} >                                       
                                        </i>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div style={styles.controls}>
                                    <div style={styles.btnForward} onClick={this.props.nextSong}>
                                        <span style={{marginLeft:4}}></span>
                                    
                                        <i className="fa fa-fw fa-forward">                                       
                                        </i>
                                    </div>
                                    <div style={styles.btnBack} onClick={this.props.prevSong}>
                                        <i className="fa fa-fw fa-backward">                                       
                                        </i>
                                    </div>
                                </div>
                            </div>
                            <div style={styles.musicInfo}>
                                <div style={styles.musicName}>{this.props.nome}</div>
                                <div style={{flexDirection:'row', display:'flex'}}>
                                    <div style={styles.musicAutor}>{this.props.autor}</div>
                                    <div style={styles.musicDuration}>{this.state.tempo_atual} / {format_hour(this.props.duracao)} </div>
                                </div>
                            </div>
                            <div style={styles.progressbar}>
                                <div style={{...styles.bar, ...{width:`${this.state.progressbar}%`}  }} ></div>
                            </div>
                        </article>
                    </div>
                    <div  id="dz-root"></div>
                </div>
            )
    }
}
const styles = {
    playerImage:{
        width:52.5,
        height:52.5,
        border:'2px solid white',
        boxSizing:'border-box',
        float:'left',
    },
    btnPlay:{
        color: 'white',
        display:'flex',
        height:'45px',
        width:'45px',
        backgroundColor:'transparent',
        padding:0,
        borderRadius:'100%',
        boxSizing:'border-box',
        border:'2px solid white',
        transition:'.5s all',
        left:'0px',
        position: 'relative',
        top:'4px',
        cursor:'pointer',
        justifyAlign:'center',
        alignItems:'center',

        
        
    },
    btnBack:{
        width: 18,
        height:18,
        border:'2px solid white',
        borderRadius: '100%',
        marginTop:3,
        boxSizing:'border-box',
        cursor:'pointer',
        fontSize: '0.6em',
        justifyAlign:'center',
        alignItems:'center',
        display:'flex'
   
        
    },
    btnForward:{
        width: 25,
        height:25,
        border:'2px solid white',
        borderRadius: '100%',
        boxSizing:'border-box',
        cursor:'pointer',
        justifyAlign:'center',
        alignItems:'center',
        display:'flex',
        fontSize: '0.75em',
        
        
    },
    controls:{
        display:'block',
        width: '30px',
        height: '48px',
        float:'left',
        marginTop:3,
        marginLeft:2

    },
    progressbar:{
        position:'absolute',
        width:'100%',
        height: '11px',
        backgroundColor:'#c2c2c2',
        bottom:0,
        display:'block',
    },
    bar:{
        width:'50%',
        height:'11px',
        backgroundColor:'green'
    },
    musicInfo:{
        display:'-webkit-box',
        display:'flex',
        width:'100%',
        height:'50px',
        flexDirection:'column',
        marginTop:4
    },
    musicName:{
        margin:'0 15px 0 0'
    },
    musicAutor:{
        margin:'0 15px 0 0',
        fontSize: '0.85em'
    },
    musicDuration:{
        marginTop:1,
        fontSize: '0.75em'
    }
}

export default BoxPlayer;