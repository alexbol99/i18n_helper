/**
 * Created by alexbol on 10/27/2015.
 */
export var loadJSON;

function loadJSON(url, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText));
                }

            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
