class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end
  def create
    @todo = Todo.new(params_todo)
    if @todo.save
      redirect_to '/'
    end
  end

  def finished
    @todo = Todo.find(params[:id])
    @todo.completed = true
    @todo.save
    if @todo.completed
      render json: @todo
    end
  end

  def undocompletion
    @todo = Todo.find(params[:id])
    @todo.completed = false
    @todo.save
    if @todo.completed == false
      render json: @todo
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    redirect_to todos_path
  end

  private

  def params_todo
    params.require(:todo).permit(:body)
  end
end
