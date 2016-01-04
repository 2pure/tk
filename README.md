# API

### Version
0.0.1

### Коллекции по темам

Формат ответа:
```json
{
	"themes": [
		{
			"name": "Название темы",
			"description": "Описание темы",
			"img_url": "http://example.com/img.png",
			"theme_url": "http://example.com/theme",
			"collections_id_list": [1, 2, 3]
		}
	]
}
```

`/api/themes?page=2&size=12`

`?all=true` возвращает все коллекции по темам

`?page=2&size=12` возвращает 12 элементов страницы 2, т.е с 12 по 24 запись коллекции по темам

### Конкретная тема
Формат ответа:
```json
{
		"name": "Название темы",
		"description": "Описание темы",
		"img_url": "http://example.com/img.png",
		"theme_url": "http://example.com/theme",
		"collections_id_list": [1, 2, 3]
}
```

`/api/themes/:id` возвращает конкретную запись темы

errors:
* 404 not found

### Новые коллекции

Фотмат ответа:
```json
{
	"collections": [
		{
			"name": "Название коллекции",
			"description": "Описание коллекции",
			"img_url": "http://example.com/img.png",
			"collection_url": "http://example.com/collection",
			"events_list": [
				{
					"name": "Название спектакля 1",
					"event_id": 1
				}
			]
		}
	]
}
```

`/api/collections?page=2&size=12`

`?all=true` возвращает все коллекции

`?page=2&size=12` возвращает 12 элементов коллекции страницы 2, т.е с 12 по 24 запись коллекции

### Конкретная новая коллекция

Формат ответа:

```json
{
		"name": "Название коллекции",
		"description": "Описание коллекции",
		"img_url": "http://example.com/img.png",
		"collection_url": "http://example.com/collection",
		"event_list": [
			{
				"name": "Название события 1",
				"event_id": 1
			}
		]
}
```

`/api/collections/:id` возвращает конкретную запись коллекции

errors:
* 404 not found

## Открытая коллекция

Описание коллекции:
```json
{
		"collection_id": 12345,
		"name": "Название коллекции",
		"description": "Описание коллекции",
		"img_url": "http://example.com/img.png",
		"event_id_list": [1, 2, 3]
}
```

Описание конкретного спектакля:
```json
{
		"event_id": 12345,
		"venue_name": "Название театра",

		"img_url": "http://example.com/img.png",
		"name": "Название спектакля",
		"description": "Описание спектакля",

		"actors_list": ["Первое имя", "Второе имя", ],
		"genres_list": ["Первый жанр", "Второй жанр", ],
		"directors_list": ["Первый режиссер", "Второй режиссер", ],

		"event_dates": [1453910400000, 1452960000000],

		"event_prices": {
			"stalls": 1000,
			"mezzanine": 2000,
			"balcony": 3000
		}
}
```

Отправляем на сервер:
```json
{
		"collection_id": 12345,
		"purchase_events": [
			{
				"event_id": 1,
				"event_date": 1453910400000
			}
		],
		"purchase_key": "mezzanine",
		"clients_number": 2
}
```
