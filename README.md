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
			"theme_id": 1
		}
	]
}
```

`/api/themes`

### Конкретная тема
Формат ответа:
```json
{
		"name": "Название темы",
		"description": "Описание темы",
		"img_url": "http://example.com/img.png",
		"collections": [
			{
				"name": "Название коллекции",
				"description": "Описание коллекции",
				"img_url": "http://example.com/img.png",
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

`/api/themes/:id` возвращает конкретную запись темы

### Новые коллекции

Фотмат ответа:
```json
{
	"collections": [
		{
			"name": "Название коллекции",
			"description": "Описание коллекции",
			"img_url": "http://example.com/img.png",
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

`/api/newcollections`

## Открытая коллекция

Описание коллекции:
```json
{
		"collection_id": 12345,
		"name": "Название коллекции",
		"description": "Описание коллекции",
		"img_url": "http://example.com/img.png",
		"events": [
			{
					"event_id": 12345,
					"venue_name": "Название театра",
					"venue_id": 123,

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
		]
}
```

`/api/collections/:id`

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

`/api/events/:id`

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
