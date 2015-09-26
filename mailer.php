<?php
if (isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['telefone'])
    && isset($_POST['mensagem'])){

    //REMETENTE --> ESTE EMAIL TEM QUE SER VALIDO DO DOMINIO
    //====================================================
    $email_remetente = "spda@spda.eng.br"; // deve ser um email do dominio
    //====================================================

    //Configurações do email, ajustar conforme necessidade
    //====================================================
    $email_destinatario = "spda@spda.eng.br"; // qualquer email pode receber os dados
    $email_reply = "$email";
    $email_assunto = "SPDA Engenharia+Projetos - Contato via site";
    //====================================================


    //Variaveis de POST, Alterar somente se necessário
    //====================================================
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $mensagem = $_POST['mensagem'];
    //====================================================

    //Monta o Corpo da Mensagem
    //====================================================
    $email_conteudo = "Nome = $nome \n";
    $email_conteudo .= "Email = $email \n";
    $email_conteudo .=  "Telefone = $telefone \n";
    $email_conteudo .=  "Mensagem = $mensagem \n";
    //====================================================

    //Seta os Headers (Alerar somente caso necessario)
    //====================================================
    $email_headers = implode ( "\n",array ( "From: $email_remetente", "Reply-To: $email_reply", "Subject: $email_assunto","Return-Path:  $email_remetente","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ) );
    //====================================================


    //Enviando o email
    //====================================================
    if (mail ($email_destinatario, $email_assunto, nl2br($email_conteudo), $email_headers)){
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'true'){
            echo "1";
            die();
        } else {
            $isSuccess = true;
        }
    } else {
        $error = true;
    }

}
?>