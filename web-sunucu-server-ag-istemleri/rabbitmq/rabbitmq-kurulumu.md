# RabbitMQ Kurulumu

Herşeyden önce bize bir RabbitMQ sunucusu lazım. Bunun için [bu adresten](https://www.rabbitmq.com/#getstarted) RabbitMQ'yu indirebilirsiniz.

İsterseniz benim de sıkça kullanıdığım gibi bir Heroku hesabınız var ise RabbitMQ'yu ücretsiz olarak eklenti olarak kullanabiliriz.

Sunucumuzu ayağa kaldırmak için aşağıdaki komutu kullanalım.

```
rabbitmq-server
```

`Starting broker... completed with 7 plugins.` mesajını görürsek başarılı bir şekilde çalışıtığını görebiliriz.

RabbitMQ sunucumuzu yerel makinamızda ayağa kaldırdıysak varsayılan olarak aşağıdaki bilgiler ile erişilebilir olacaktır.

`amqp://guest:guest@localhost:5672/`
