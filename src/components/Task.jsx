
import PropTypes from 'prop-types';
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

function Task(props) {
  
  
    const handleDeleteClick = (event) => {
        event.stopPropagation();
        props.delete();
      };
      const handleEditClick = (event) => {
        event.stopPropagation();
        props.edit();
      };
  return (
    <div className={`flex items-center justify-between w-full border border-slate-100 mb-4 p-4 ${props.isDone ? 'bg-green-500' : 'bg-white'}`}>
        <p className='capitalize'>{props.content}</p>
        <div className='flex justify-between items-center gap-2 text-xl'>
            
            <div onClick={handleEditClick}><MdOutlineModeEditOutline className='text-yellow-400' /></div>
            <div onClick={handleDeleteClick}><MdDeleteOutline className='text-red-600' /></div>
            
            <input type="checkbox" className='h-4 w-4' onChange={props.doneOrUndone} checked={props.check}/>
        </div>
    </div>
    
  )
}
Task.propTypes = {
  content: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  doneOrUndone: PropTypes.func.isRequired,
  isDone: PropTypes.bool.isRequired,

};
export default Task