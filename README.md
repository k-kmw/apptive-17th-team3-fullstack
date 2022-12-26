# apptive-17th-team3-fullstack

team3's fullstack(Node JS + React.js + Next.js + NextAuth)
Without DB, Using Google Calendar API

# 논의사항

    - 프로젝트별 테마 색깔?
    - 한 프로젝트의 상세일정 받아오는게 있나?
    - api경로를 config파일 만들어서 거기서 쓸까 or baseURL을 따로 빼둘까(도메인 나중에 바뀜)
    - calendarID같은거 본인꺼 써야되는데..., 프런트는 api호출부 어떻게?
    - 일별 평균 작업 수....(일일 작업 수를 받아올 수 있으면, 앞뒤로 일주일치 불러와서...)
    - 혹시 figma말고 다른데서 디자인 있는거 있나?
    - 프로젝트 일정만 보여주기?

# API document

- 프로젝트

  1. list
     ```
     url : baseURL/api/p/list
     param : {}
     response : {
        status : 200,
        message : [{projectid, title, description, color}, ...]
     }
     backend_note : calendar.calendarlist.list, 프로젝트 일정만 가져오기?
     ```
  2. 프로젝트 내 일정들 받아오기(events)
     ```
     url : baseURL/api/p/events
     param : {
         projectID
     }
     response : {
         status : 200,
         message : {
             percent....,
             lists : [{title, status, description, location, start, end}, ...]
         }
     }
     backend_note : calendar.events.list, calculate percent
     ```
  3. insert
     ```
     url : baseURL/api/p/insert
     param : {
         title, description
         options : location
     }
     response : redirect to '/'
     backend_note : calendar.calendars.insert
     ```
  4. update
     ```
     url : baseURL/api/p/update
     param : {projectID, location, title, description}
     response : {
         status : 200,
         message : "success"
     }
     backend_note : calendar.calendars.patch
     ```
  5. delete
     ```
     url : baseURL/api/p/delete
     param : {projectID}
     response : {
         status : 200,
         message : success
     }
     backend_note : calendar.calendars.delete
     ```

- 일정

  1. insert
     ```
     url : baseURL/api/e/insert
     param : {
         title, start(2022-05-16), end, hour([01, 16]), min([16, 50]) projectID
         options : location, description, allday
     }
     response : {
        status : 200,
        message : redirect to '/'
     }
     backend_note : calendar.events.insert
     ```
  2. update
     ```
     url : baseURL/api/e/update
     param : {
         eventID, projectID, title, start(2022-05-16), end, hour([01, 16]), min([16, 50]), 
        option: allday, location, description, status
     }
     response : {
         status : 200,
         message : "success"
     }
     backend_note : calendar.events.patch
     ```
  3. delete
     ```
     url : baseURL/api/e/delete
     param : {projectID, eventID}
     response : {
         status : 200,
         message : "success"
     }
     backend_note : calendar.events.delete
     ```
  4. daily(프로젝트별 당일 일정)
     ```
     url : baseURL/api/e/daily
     param : {
         projectID, date (YYYY-MM-DD 형식)
     }
     response : {
         status : 200,
         message : [{projectName,summary,description,location,start,end},...]
     }
     backend_note :
     ```
    5. status_update
        ```
        url : baseURL/api/e/status_update
        param : {eventID, projectID, status}
        response : {
            status : 200,
            message : "success"
        }
        backend_note : calendar.events.patch
        ```

- api
  1. daily(당일 일정 받아오기)
     ```
     url : baseURL/api/daily
     param : {}
     response : {
         status : 200,
         message : [{color,created,updated,summary,allday,start,end,id,status}, ...]
     }
     backend_note :
     ```
  2. recent(최근 작업 명 표시, 7일전~7일후 기간동안의 작업 받아오기 order by endTime)
     ```
     url : baseURL/api/recent
     param : {}
     response : {
         status : 200,
         message : [{projectID,status,updated,summary,start,end,id}, ...]
     }
     backend_note : 
     ```
