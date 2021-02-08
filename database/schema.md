Mongoose schema sketch for 'repos'

[
  {
    id: Number,
    name: String,
    full_name: String
    owner: {
        login: String,
        id: Number,
        avatar_url: String,
        url: String,
        html_url: String
    },
    html_url: String,
    url: String,
    description: String,
    forks_count: Number,
    watchers: Number
  }
]