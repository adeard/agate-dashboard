# API Documentation: Download Performance Durasi Operasional

This endpoint generates and downloads an Excel report containing operational grading durations grouped by operational shift (06:00 AM to 03:59 AM the next day).

**Endpoint URL:** `[BASE_URL]/v4/dashboard/download-performance`  
_(Note: adjust `[BASE_URL]/v4/dashboard` to match your actual routing base for dashboard v4)_

**Method:** `GET`

**Authentication:**
Requires a valid JWT Bearer token in the request headers.  
`Authorization: Bearer <your_token>`

---

### Query Parameters

| Parameter   | Type   | Required | Description                                       |
| :---------- | :----- | :------- | :------------------------------------------------ |
| `date_from` | String | **Yes**  | Start date for the report in `YYYY-MM-DD` format. |
| `date_to`   | String | **Yes**  | End date for the report in `YYYY-MM-DD` format.   |
| `factory`   | String | No       | ID of a specific factory to filter by.            |

**Example Request:**

```http
GET /v4/dashboard/download-performance?date_from=2024-10-01&date_to=2024-10-15&factory=61c12ab349f
Authorization: Bearer eyJhbG...
```

---

### Response

- **Success (200 OK):**
  Returns a binary `.xlsx` file (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`). The browser should automatically prompt a download with a filename like: `Performance-Durasi-Operasional-2024-10-15T...xlsx`.
- **Error (400 Bad Request):**
  Returned if `date_from` or `date_to` are missing.
  ```json
  {
    "code": 400,
    "success": false,
    "message": "date_from and date_to must be filled."
  }
  ```

---

### Report Columns

The generated Excel sheet will contain the following columns:

1. **Hari**: Day of the week (e.g., Senin, Selasa)
2. **Tanggal**: Date (DD/MM/YYYY)
3. **Jumlah truk**: Total count of trucks graded in that shift
4. **Mulai Grading**: Time of the first grading in that shift (Format: `HH:mm`)
5. **Selesai Grading**: Time of the last grading in that shift (Format: `HH:mm`)
6. **Durasi Menit**: Total duration between start and finish in minutes
