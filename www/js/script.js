document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 'default'});
    db.transaction(popularDB, errorCB);
}

function popularDB(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo text, editora text, ano int, photo blob, sinopse text)');
}

function errorCB(err){
    alert("erro: " + err.code);
}

function successCB(){
    alert("sucesso");
}
function successRemove(){
    alert("sucesso");
}

function show(){
    var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 'default'});
    db.transaction(queryDB, errorCB);
    
}

function queryDB(tx){
    tx.executeSql('SELECT * FROM filmes', [], querySuccess, errorCB);
}

function querySuccess(tx, results){
    var len = results.rows.length;
    document.getElementById('accordion').innerHTML = "";
    for(var i=0; i<len; i++){
        //alert("ID: " + results.rows.item(i).id + "clube: " + results.rows.item(i).clubes);
        document.getElementById('accordion').innerHTML += "<div class='panel panel-default' id='panel-default'> \
            <div class='panel-heading' role='tab' id='headingOne'> \
                <h4 class='panel-title'> \
                    <a role='button' data-toggle='collapse' data-parent='#accordion' id="+results.rows.item(i).id+" href='#collapse"+results.rows.item(i).id+"' aria-expanded='true' aria-controls='collapseOne'>"
                    + results.rows.item(i).titulo 
                    + "<span class='glyphicon glyphicon-remove' aria-hidden='true' class='remove' onclick='deleta(this)'></span></a> \
                </h4>"
            + "</div>" 
            + "<div id='collapse"+results.rows.item(i).id+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne'> \
                <div class='panel-body'> \
                    <p><strong>Editora:</strong>" + results.rows.item(i).editora + "</p> \
                    <p><strong>Ano:</strong>" + results.rows.item(i).ano + "</p> \
                    <p><strong>Sinopse:</strong><br>"  
                    + results.rows.item(i).sinopse + "</p> \
                </div> \
            </div> \
        </div>";
    }
}

function esconder(){
    document.getElementById('aparece').innerHTML = "";
}
function adiciona(){
    var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 'default'});
    db.transaction(function(transaction){
        transaction.executeSql('INSERT INTO filmes(titulo, editora, ano, photo, sinopse) VALUES(?,?,?,?,?)', [
            document.querySelector('#titulo').value, 
            document.querySelector('#editora').value,
            document.querySelector('#ano').value,
            document.querySelector('#photo').value,
            document.querySelector('#sinopse').value
            ], successCB, errorCB);
    })
}

function deleta(element){
    var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 'default'});
    db.transaction(function(transaction){
        transaction.executeSql('DELETE FROM filmes WHERE id = (?)', [element.parentNode.id], show, errorCB);
    })
}