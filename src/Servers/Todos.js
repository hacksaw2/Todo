import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,  },
    password: { type: String, required: true },
    todo: [
        {
            todo: { type: String, required: true },
        }
    ]
});
const TodosModel = mongoose.model("Todos",TodosSchema)
export default TodosModel