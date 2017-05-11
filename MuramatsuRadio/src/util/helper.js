export function format_hour(value){
    var time = value
    var minutos = Math.floor(time / 60);
    var segundos = time - minutos * 60;

        return ((minutos.toString().length == 1 ? "0" + minutos : minutos ) + ':'+(segundos.toString().length == 1 ? "0" + segundos : segundos ));
}