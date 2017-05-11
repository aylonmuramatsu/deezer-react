import React, { Component } from 'react'
// import Deezer from 'deezer-node-api'
import jQuery from 'jquery';
import axios from 'axios';
import BoxPlayer from '../../widgets/boxPlayer'
class Home extends Component {
    constructor(props){
        super(props)

        this.state = { list: [] , tocando: false, musica_atual: null, progressbar: 0 }

        this.tocar = this.tocar.bind(this);

        this.musica_atual = null;
        this.fila = [];
        this.DZ = window.DZ;
        this.styleExtra = {};
    }

    handleSubmit(event){
        event.preventDefault();

        
        let props = this;
        jQuery.ajax({
            type: 'GET',
            url: `http://api.deezer.com/search?q=${this.busca.value}&output=jsonp&limit=100`,
            dataType: 'jsonp',
            success: function(resp) {
                props.setState({...props.state, list:resp.data });
              
                setTimeout(function(){
                    props.setState({...props.state, list:[]});
                }, 1000 * 30)
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    }

    componentDidReceiveProps(){
    //componentDidMount(){
        console.log(this.state.musica_atual)
        
    }

    play(){
        console.log('teste',this.state.tocando);
        if(this.state.tocando)
            this.DZ.player.pause();
        else 
            this.DZ.player.play();   
        
        this.setState({...this.state, tocando: !this.state.tocando})
    }

    prevSong(){
        this.DZ.player.prev();
        this.musica_atual = this.DZ.player.getCurrentTrack();

    }
    nextSong(){
        this.DZ.player.next();
        setTimeout(function(){

            this.musica_atual = this.DZ.player.getCurrentSong();
        },600)
        
    }
    tocar(track){
        let DZ = window.DZ;

        this.fila = this.fila.map(
            (musica) => {
                if(musica != track.id)
                    return track.id;
                
            }
        )
        this.musica_atual = track;
        this.styleExtra = {backgroundImage: `url("${this.musica_atual.album.cover_xl}")` } ;
        
        this.setState({...this.state, tocando: true, musica_atual: track});
        DZ.player.playTracks([track.id]);

        
        

    }

    atualizar(){
        this.musica_atual = window.DZ.player.getCurrentTrack();
        console.log(this.musica_atual)
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
                            <div className="box" style={{backgroundColor:'rgba(255, 255, 255, 0.51)'}}>
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
                                                        <div className="is-pulled-right">
                                                            <div className="button is-small is-primary is-flex" onClick={ () => this.tocar(item)}>
                                                                {`${this.state.tocando ? 'Pausar' : 'Ouvir'}`}
                                                            </div>
                                                            <br/>
                                                            <br/>
                                                            <div className="button is-small is-danger is-flex" onClick={ () => this.addFila(item.id)}>
                                                            Add para fila
                                                            </div>
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
                <section className="hero is-dark" style={{position:'fixed', top:0, zIndex:2, width:'100%'}}>
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
                <section className="container" style={{padding:'0 0 80px', zIndex:1, marginTop:220}}>
                    <div className="container">
                        <div className="columns  is-multiline">
                            {this.renderRows()}
                        </div>
                    </div>
                </section>
               <nav className="nav hero is-dark" style={{bottom:0, position:'fixed',height:60, width:'100%'}} >
                   <div className="">
                       <BoxPlayer tocando={this.state.tocando}
                        nome={this.musica_atual != null ? this.musica_atual.title_short : '---------'}
                        autor={this.musica_atual != null ? this.musica_atual.artist.name : '--------'}
                        cover={this.musica_atual != null ? this.musica_atual.album.cover_xl : ''}
                        duracao={this.musica_atual != null ? (this.musica_atual.duration) : 0}
                        play={this.play.bind(this)}
                        nextSong={this.nextSong.bind(this)}
                        prevSong={this.prevSong.bind(this)}
                        atualizar={this.atualizar.bind(this)}
                       />
                   </div>
                </nav>
                {
                }
                <div style={{...this.styleExtra, ...styles.coverAlbum}}></div>
            </div>
        );

    }

}
const styles = {
    coverAlbum: {
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        backgroundPosition:'center center',
        filter: 'blur(1px)',
        position:'fixed',
        width:'100%',
        height:'100%',
        opacity:'0.6',
        top:0,
        zIndex:0
    }
}
export default Home;