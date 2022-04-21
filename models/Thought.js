const moment = require("moment");
const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 280,
    },
    username: {
      type:String,
      required:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => moment(value).format("MMMM Do YYYY, h:mm:ss"),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length ? this.reactions.length : 0;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;