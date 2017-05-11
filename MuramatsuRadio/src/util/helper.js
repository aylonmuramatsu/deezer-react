export function format_hour(value){
    let segundos = +value;

    if(segundos >= 60)
        return ((segundos)/60).toFixed(2).toString().replace('.', ':');
    else
        return ('00:'+(segundos.toString().length == 1 ? "0" + segundos : segundos ));
}