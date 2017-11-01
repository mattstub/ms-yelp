# RESTful Routes

name   | url                                | verb   | description  
-------|------------------------------------|--------|------------------------------------------  
INDEX  | /campgrounds                       | GET    | retrieves all information about campsites  
NEW    | /campgrounds/new                   | GET    | displays form for new campsite  
CREATE | /campgrounds                       | POST   | creates 1 new campsite  
SHOW   | /campgrounds/:id                   | GET    | shows info about a campsite  
-------|------------------------------------|--------|------------------------------------------
NEW    | /campgrounds/:id/comments/new      | GET    | displays form for new comment
CREATE | /campgrounds/:id/comments          | POST   | creates 1 new comment