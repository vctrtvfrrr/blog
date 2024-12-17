function base64Decode(base64String) {
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    base64String = base64String.replace(/[^A-Za-z0-9+/=]/g, "");

    while (i < base64String.length) {
        enc1 = base64Chars.indexOf(base64String.charAt(i++));
        enc2 = base64Chars.indexOf(base64String.charAt(i++));
        enc3 = base64Chars.indexOf(base64String.charAt(i++));
        enc4 = base64Chars.indexOf(base64String.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output += String.fromCharCode(chr1);

        if (enc3 != 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output += String.fromCharCode(chr3);
        }
    }

    return output;
}