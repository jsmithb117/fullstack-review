Mongoose schema sketch for 'repos'


{
  repoId: {
    type: Number,
    index: true,
    unique: true
  },
  name: String,
  html_url: String,
  description: String,
  forks_count: Number,
  watchers: Number,
  owner: String
}
