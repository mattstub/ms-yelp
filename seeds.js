const mongoose   = require('mongoose')
const Campground = require('./models/campground')
const Comment    = require('./models/comment')

let data = [
    { 
        name: "Cloud's Rest",
        image: 'https://farm5.staticflickr.com/4080/4938516049_eef5cbc734.jpg',
        description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed dui ligula. Donec porttitor tortor at nulla porta, eget facilisis enim dictum. Proin eget congue metus. Donec tincidunt porta neque eu volutpat. Pellentesque a felis vitae odio auctor ullamcorper ac eget dui. Aenean rhoncus molestie nisi sed maximus. In tempus, lacus vitae condimentum fringilla, lectus mi hendrerit risus, in sodales erat justo non elit. Donec sodales, quam aliquet viverra pharetra, libero diam vestibulum libero, ut pulvinar augue turpis id felis. Proin sed tortor dictum, ullamcorper neque faucibus, congue dolor. In hac habitasse platea dictumst. Nunc semper ullamcorper sapien, ac dapibus felis euismod non. Duis semper sapien mi, malesuada molestie ligula lobortis quis. Aliquam eget orci sit amet tortor tristique rhoncus non id magna. Donec vitae arcu sit amet orci posuere ultrices ut vitae nulla. Phasellus cursus hendrerit est, a rutrum nisi aliquet quis. Etiam fringilla dui tristique, ultricies felis id, iaculis tellus. ' 
    }, 
    {
        name: 'Cypress Point',
        image: 'https://farm5.staticflickr.com/4044/4455053417_1f5fac5631.jpg',
        description: 'Integer gravida dolor sit amet efficitur laoreet. Sed finibus turpis eget leo mattis tempus. Duis vitae iaculis massa. Etiam augue est, aliquam nec mi a, euismod fringilla mauris. Fusce diam tellus, tincidunt vitae magna ac, euismod euismod dui. Donec id sagittis risus. Curabitur eu quam luctus, pulvinar libero at, bibendum ipsum. Sed nec nisi massa. Fusce malesuada a leo eget venenatis. Suspendisse vel orci ut neque auctor tincidunt sit amet ut est. Nam vestibulum diam sem, venenatis suscipit justo efficitur dapibus. Maecenas sollicitudin tempor ultrices. '
    }, 
    {
        name: 'Ridge Top',
        image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
        description: ' Proin sed tortor dictum, ullamcorper neque faucibus, congue dolor. In hac habitasse platea dictumst. Nunc semper ullamcorper sapien, ac dapibus felis euismod non. Duis semper sapien mi, malesuada molestie ligula lobortis quis. Aliquam eget orci sit amet tortor tristique rhoncus non id magna. Donec vitae arcu sit amet orci posuere ultrices ut vitae nulla. Phasellus cursus hendrerit est, a rutrum nisi aliquet quis. Etiam fringilla dui tristique, ultricies felis id, iaculis tellus. Donec venenatis purus vel congue fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et turpis vehicula, hendrerit nunc sit amet, aliquet nunc. Praesent vehicula sollicitudin rhoncus. Cras ac gravida est. Integer neque augue, scelerisque feugiat ex non, tincidunt semper sapien. Nullam vitae eros at ante pharetra pharetra nec non lacus. Sed a erat augue. Nam vitae semper orci. Quisque libero urna, ullamcorper rutrum elementum quis, hendrerit id nisi. '
    }
]

function seedDB() {
    Campground.remove({}, (err) => { 
        if(err) 
            console.log(err) 
        else {
            console.log('removed campgrounds')
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => { 
                    if(err) 
                        console.log(err)
                    else {
                        console.log('added campground')
                        campground.comments.remove()
                        Comment.create(
                            {
                                text: 'this is awesome, wish we had internet', author: 'homer'
                            }, (err, comment) => {
                                if(err)
                                    console.log(err)
                                else {
                                    campground.comments.push(comment)
                                    campground.save()
                                    console.log('created comment')
                                }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB;