## Kullanım

### Kurulum

    npm install DgQaN/konsol-uyari-sistem

### JavaScript İçi Kodlar

``` js
const { Sistem } = require('konsol-uyari-sistem');
const uyari = new Sistem({
  colors: true,
  timestamps: true,
  trace: true
});
```

### Konsol Mesaj Ayarları

#### INFO

``` js
logger.info('Mesaj');
```

#### WARN

``` js
logger.warn('Mesaj');
```

#### ERROR

``` js
logger.error('Mesaj');
```

#### DEBUG

``` js
logger.debug('Mesaj');
```

### Konsolu Temizle

``` js
logger.clear();
```
