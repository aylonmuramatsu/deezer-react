import React, { Component } from 'react'
// import Deezer from 'deezer-node-api'
import jQuery from 'jquery';
import axios from 'axios';
import BoxPlayer from '../../widgets/boxPlayer'
class Home extends Component {
    constructor(props){
        super(props)

        this.state = { list: [ 
         /*   {
                "id": 3590194,
                "readable": true,
                "title": "Knights Of Cydonia",
                "title_short": "Knights Of Cydonia",
                "title_version": "",
                "link": "http://www.deezer.com/track/3590194",
                "duration": 367,
                "rank": 700866,
                "explicit_lyrics": false,
                "preview": "http://e-cdn-preview-9.deezer.com/stream/90f6f6f8ba41b6bfbeb28f4813506b26-6.mp3",
                "artist": {
                    "id": 705,
                    "name": "Muse",
                    "link": "http://www.deezer.com/artist/705",
                    "picture": "http://api.deezer.com/artist/705/image",
                    "picture_small": "http://e-cdn-images.deezer.com/images/artist/6a315224a0338e94c37c2d3c706a306a/56x56-000000-80-0-0.jpg",
                    "picture_medium": "http://e-cdn-images.deezer.com/images/artist/6a315224a0338e94c37c2d3c706a306a/250x250-000000-80-0-0.jpg",
                    "picture_big": "http://e-cdn-images.deezer.com/images/artist/6a315224a0338e94c37c2d3c706a306a/500x500-000000-80-0-0.jpg",
                    "picture_xl": "http://e-cdn-images.deezer.com/images/artist/6a315224a0338e94c37c2d3c706a306a/1000x1000-000000-80-0-0.jpg",
                    "tracklist": "http://api.deezer.com/artist/705/top?limit=50",
                    "type": "artist"
                },*/
        ], tocando: false }

        this.tocar = this.tocar.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        
        let props = this;
        jQuery.ajax({
            type: 'GET',
            url: `http://api.deezer.com/search?q=${this.busca.value}&output=jsonp&limit=10`,
            dataType: 'jsonp',
            success: function(resp) {
                props.setState({...props.state, list:resp.data });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    }
    tocar(id){
        let DZ = window.DZ;
        if(!this.state.tocando)
            DZ.player.playTracks([id]);
        else
            DZ.player.pause();

        this.setState({...this.state, tocando: !this.state.tocando});
    }

    addFila(id){
            let DZ = window.DZ;
            DZ.player.addToQueue([id]);
            alert("Adicionado para fila!");
    }

    renderRows(){

        const list = this.state.list || [];

        return list.map(
            (item) => {
                 return (
                        <div key={item.id} className="column is-6">
                            <div className="box">
                                <article className="media">
                                    <div className="media-left">
                                        <figure className="image is-64x64">
                                            <img src={item.album.cover} alt={item.title}/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <div className="content">
                                            <p>
                                                <strong>
                                                    <small>
                                                        {item.title}
                                                        <div className="button is-small is-primary is-pulled-right" onClick={ () => this.tocar(item.id)}>
                                                            {`${this.state.tocando ? 'Pausar' : 'Ouvir'}`}
                                                        </div>
                                                        <div className="button is-small is-primary is-pulled-right" onClick={ () => this.addFila(item.id)}>
                                                           Add para fila
                                                        </div>
                                                    </small>
                                                </strong> 
                                                <br/>
                                                {item.artist.name}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    )
            }
        )

        

    }
    render(){
        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                MuramatsuRadio
                            </h1>
                            <h2 className="subtitle">
                            Integration Deezer  - <img src="http://e-cdn-files.deezer.com/cache/images/common/logos/deezer.c0869f01203aa5800fe970cf4d7b4fa4.png" alt="" height="30px"/>
                            </h2>
                            
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="field has-addons">
                                        <p className="control is-expanded">
                                                <input className="input" type="text" name="search" placeholder="Pesquisar"  ref={(input) => this.busca = input} />
                                                
                                        </p>
                                        <p className="control">
                                            <button className="button is-info">
                                            Pesquisar
                                            </button>
                                        </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <br/>
                <section className="container" style={{padding:'0 0 80px'}}>
                    <div className="container">
                        <div className="columns  is-multiline">
                            {this.renderRows()}
                        </div>
                    </div>
                </section>
               <nav className="nav hero is-dark" style={{bottom:0, position:'fixed', width:'100%'}}>
                   <div className="">
                       <BoxPlayer situacao={this.state.tocando}/>
                   </div>
                </nav>
            </div>
        );

    }

}

export default Home;