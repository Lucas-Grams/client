Padrão escolhindo: Observer

Aplicado no ClienteService

Explicação do Padrão: o padrão Observer é um padrão comportamental que 
serve para projetar um modelo de comunicação consistente entre um conjunto 
de objetos dependentes e um objeto do qual eles depende.
Dessa forma trabalhamos com o conceito de publisher e subscriber, onde o 
publisher é o objeto que possui a informação e o subscriber é o objeto que  
deseja ser notificado quando a informação é alterada.

Nesse projeto o padrão Observer foi aplicado para notificar os componentes 
que consomem o ClienteService quando um cliente é cadastrado, atualizado ou
excluído. Dessa forma, o ClienteService é o publisher e os componentes que
consomem o ClienteService são os subscribers.


