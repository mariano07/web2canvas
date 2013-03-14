/*
=====================
 MODIFICAÇÕES GERAIS
=====================
*/

// variaveis globais
// OBS: outras variaveis globais são geradas no layout_base
var titulo_caixa = "Editar Cartão",
    titulo_nova_caixa = "Novo Cartão",
    campo_vazio = "Click para escrever",
    mensagem_erro = "Não pode ser vazio!",
    mensagem_confirma = 'Você tem certeza que deseja continuar?';
    msg_titulo = "",
    msg_texto = "",
    msg_tipo = "";

// modificar stilo dos botoes
$.fn.editableform.buttons = 
  '<button type="submit" class="btn btn-success editable-submit"><i class="icon-ok icon-white"></i></button>' +
 '<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>'; 
$.fn.editable.defaults.mode = 'inline';

// para saber o maior indice do array
Array.max = function( array ){
  return Math.max.apply( Math, array );
};

/*
===============================
 ITENS CARREGADOS COM A PAGINA
===============================
*/

// chamada do plugin x-editable
// $('.cartao').editable({
//   type: 'textarea',
//   url: urlNovoEdita,
//   title: titulo_caixa,
//   emptytext: campo_vazio,
//   disabled: true,
//   validate: function(value) {
//       if($.trim(value) == '') {
//           return mensagem_erro;
//       }
//   },
//   success: function(response) {
//       msg_titulo = "Cartão";
//       if(response.success) {
//         msg_texto = response.msg;
//         msg_tipo = "success";
//       } else if(response.error) {
//         msg_texto = response.msg;
//         msg_tipo = "error";
//       }
//       // notificacao
//       $.pnotify({
//         title: msg_titulo,
//         text: msg_texto,
//         type: msg_tipo
//       });
//       $('.cartao').editable("disable");
//       $(this).parent().next().removeClass("efeito_opcoes_cartao");
//   }
// });

(function ($) {
    var cartao = function (options) {
        this.init('cartao', options, cartao.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(cartao, $.fn.editabletypes.abstractinput);

    $.extend(cartao.prototype, {   
        render: function() {
           this.$input = this.$tpl.find('textarea');
        },
        
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
            var html = $('<div>').text(value.texto).html();
            $(element).html(html); 
        },
        
        html2value: function(html) {        
          return null;  
        },
      
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       str2value: function(str) {
           return str;
       },                
          
       value2input: function(value) {
           html = $(".cartao").closest('a').text();
           console.log(html)
           this.$input.filter('[name="texto"]').val(html);
           this.$input.filter('[name="cor"]').val("#fff");
       },       
           
       input2value: function() { 
           return {
              texto: this.$input.filter('[name="texto"]').val(),
              cor: this.$input.filter('[name="cor"]').val() 
           };
       },        
       
       activate: function() {
            this.$input.filter('[name="texto"]').focus();
       },  
       
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }       
    });

    cartao.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        // tpl: '<div class="editable-address"><label><span>texto: </span><input type="text" name="texto" class="input-xlarge"></label></div>'+
             // '<div class="editable-address"><label><span>cor: </span><input type="text" name="cor" class="input-mini"></label></div>',
        tpl: '<div class="editable-address"><textarea name="texto" rows="7"></textarea></div><br />'+
             '<div class="editable-address clearfix"><textarea name="cor" class="input-mini"></textarea><div class="cores_cartao" data-color="#FF0000" style="background:#FF0000;"></div><div class="cores_cartao" data-color="#FF8000" style="background:#FF8000;"></div><div class="cores_cartao" data-color="#00FF80" style="background:#00FF80;"></div><div class="cores_cartao" data-color="#7AFFBD" style="background:#7AFFBD;"></div></div>',
             
        inputclass: ''
    });

    $.fn.editabletypes.address = cartao;

}(window.jQuery));


$('.cartao').editable({
    url: urlNovoEdita,
    title: titulo_caixa,
    emptytext: campo_vazio,
    disabled: true,
    value: {
        texto: "",
        cor: ""
    }, // End value
    validate: function(value) {
        if(value.texto === '') return mensagem_erro; 
    }, // End validate function()
    display: function(value) {
        if(!value) {
            $(this).empty();
            return; 
        } // End if
        var html = $('<div>').text(value.texto).html();
        $(this).html(html); 
    }, // End display option
    success: function(response) {
        msg_titulo = "Cartão";
        if(response.success) {
          msg_texto = response.msg;
          msg_tipo = "success";
        } else if(response.error) {
          msg_texto = response.msg;
          msg_tipo = "error";
        }
        // notificacao
        $.pnotify({
          title: msg_titulo,
          text: msg_texto,
          type: msg_tipo
        });
        $('.cartao').editable("disable");
        $(this).parent().next().removeClass("efeito_opcoes_cartao");
    },
}); // End editable()

// $('#cor').colourPicker({
//     title: false
// });



/*
=============================
 ITENS GERADOS DINAMICAMENTE
=============================
*/

// chamada do plugin x-editable
$('.itens').editable({
  selector: 'a',
  url: urlNovoEdita,
  title: titulo_nova_caixa,
  placement: "top",
  value: {
      texto: campo_vazio, 
      cor: "#fff"
  },
  validate: function(value) {
      if($.trim(value) == '') {
          return mensagem_erro;
      }
  },
  success: function(response) {
      msg_titulo = "Cartão";
      if(response.success) {
        msg_texto = response.msg;
        msg_tipo = "success";
      } else if(response.error) {
        msg_texto = response.msg;
        msg_tipo = "error";
      }
      // notificacao
      $.pnotify({
        title: msg_titulo,
        text: msg_texto,
        type: msg_tipo
      });
      $('.cartao').editable("disable");
      $(this).parent().next().removeClass("efeito_opcoes_cartao");
  }
});

// ao clicar no botao de adicionar novo item
$('.adicionar_item').click(function(){
    var todasClassesBotao = $(this).attr('class'),
      classeBotao = todasClassesBotao.split(" ")[0],
      keys = [],
      html;

    $("a#"+classeBotao).each(function() {
        keys.push(parseInt($(this).attr('data-pk')));
    });

    if(keys.length > 0) {
      var maiorIndice = Array.max(keys),
          indiceItem = maiorIndice + 1;
    } else {
      var indiceItem = 1;
    }

    html = '<li><p><a href="#" id="'+classeBotao+'" class="editable-click editable-empty cartao novo" data-type="address" data-value="" data-placeholder="'+campo_vazio+'" data-pk="'+indiceItem+'">'+campo_vazio+'</a><span class="mais_opcoes_cartao pull-right"><i class="icon-chevron-down"></i></span></p>  <div class="opcoes_cartao"><img src="'+urlStatic+'edit.png" class="editar_cartao" alt="Editar" title="Editar"/><img src="'+urlStatic+'icon_color.png" class="colorir_cartao" alt="Colorir Cartão" title="Colorir Cartão"/><img src="'+urlStatic+'close.png" class="deletar_cartao" alt="Deletar" title="Deletar"/></div></li>';

    $("div."+classeBotao+" > ul").append(html);
    setTimeout(function () {
       $("a#"+classeBotao+":last").trigger('click');
    }, 100);
    

});


/*
=================
 MODIFICAR ITENS
=================
*/

// chamada para editar cartao
// para campos criados dinamicamente chamo assim

// libera para editar cartao
$(document).on("click", ".editar_cartao", function(){
    $(this).parent().prev().children(".cartao").editable("enable");
    var cartao = $(this);
    setTimeout(function(cartao){
        cartao.parent().prev().children(".cartao").trigger('click');
    }, 100, cartao);
});

// testa se a edicao no cartao foi cancelada
$('.cartao').on('hidden', function(e, reason) {
    if(reason === 'onblur' || reason === 'cancel') {
        $(this).closest("p").removeAttr( 'style' );
        $('.cartao').editable("disable");
        $(this).parent().next().removeClass("efeito_opcoes_cartao");
    } 
});

// abre opcoes de editar com efeito
$(document).on("click", ".mais_opcoes_cartao", function(){
  $(this).parent().next().toggleClass("efeito_opcoes_cartao");
});

// escolhe a cor do cartao
$(document).on("click", ".cores_cartao", function(){
    var cor = $(this).attr('data-color');
    $(this).closest("p").css("background-color",'"'+cor+'"');
    $(this).parent().find('.input-mini').val(cor);
});

// deletar_cartao
$(document).on("click", ".deletar_cartao", function(){

  if(confirm(mensagem_confirma)) {
    id = $(this).parent().parent().find('a.cartao').attr('id');
    indice = $(this).parent().parent().find('a.cartao').attr('data-pk');

    removeItem(id,indice,true);
  }
});

// para remover itens
function removeItem(id,indice,remove) {

  ajax(urlRemove+'?name='+id+'&pk='+indice+'', [''], 'target_ajax');
  var status = statusItem(id,indice,remove);
  if(status === true) {
    return true
  } else {
    return false
  }
}

// atualiza indices e cria o cartao movido
function atualizaIndiceItens(id) {
  var values = {},
      value,
      valuesUrl;
  $("."+id).children("ul").find('a.cartao').each(function(index) {
    
    value = $(this).text();
    if(value !== campo_vazio) {
      index += 1;
      values[index] = value;
      $(this).children("a").attr('data-pk',index)
    }
  });
  valuesUrl = jQuery.param(values);
  ajax(urlAtualiza+'?name='+id+'&'+valuesUrl, [''], 'target_ajax');
}


function statusItem(id,indice,remove) {
  // o terceiro parametro diz se o elemento sera deletado no DOM
  var mensagem = $("#target_ajax").text(),
      texto = "";

  if (mensagem.length > 0) {

    if(mensagem === 'True') {
      msg_titulo = "Cartão";
      msg_texto = "Removido com Sucesso!";
      msg_tipo = "success";
      
      if(remove===true) {
        // encontro elemento a ser deletado
        $("a#"+id).each(function(){
          if($(this).attr('data-pk') == indice)
            $(this).parent().parent().fadeOut("slow", function() { $(this).remove() })
        });
      } else if(remove===false) {
        msg_texto = "Movido com Sucesso!";
      }


    } else if(mensagem === "False") {
      msg_texto = "Erro na remoção!";
      msg_tipo = "error";
    }

    // notificacao
    $.pnotify({
      title: msg_titulo,
      text: msg_texto,
      type: msg_tipo
    });

  } else {
    console.log("aguardando resposta...")
    setTimeout('statusItem("'+id+'",'+indice+','+remove+')', 300);
  }
  // limpo o retorno da chamada ajax
  $("#target_ajax").empty();
  return true
}