package user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import user.bean.UserDTO;
import user.bean.UserPaging;
import user.dao.UserDAO;

@Service
public class UserServiceImpl implements UserSErvice{
    @Autowired
    private UserDAO userDAO;
	@Autowired
	private UserPaging userPaging;

    @Override
    public void write(UserDTO userDTO) {
        userDAO.write(userDTO);
    }

    @Override
    public String isExistId(String id) {
		UserDTO userDTO = userDAO.isExistId(id);
		
		if(userDTO==null) {
			return "non_exist";
		}
		else
			return "exist";
	}

@Override
	public Map<String, Object> getUserList(String pg) {
		//pg당 3개씩
		int a = Integer.parseInt(pg);
		int endNum = a * 3; 
		int startNum = endNum - 2;

		//Map<String, Integer> map = new HashMap<String, Integer>();
//		map.put("startNum", startNum);
//		map.put("endNum", endNum);
		
		List<UserDTO> list = userDAO.getUserList(startNum);
		//List<UserDTO> list = userDAO.getUserList(startNum, endNum);
		
		//페이징처리
		int totalA = userDAO.getTotalA(); //총글수

		 userPaging.setCurrentPage(a);
		 userPaging.setPageBlock(3);
		 userPaging.setPageSize(3);
		 userPaging.setTotalA(totalA);
		 userPaging.makePagingHTML();
		//list => json 으로 변환, dependency이용
		
		Map<String, Object> map = new HashMap<>();

		map.put("list", list);
		map.put("userPaging", userPaging);

		return map;
	}

	@Override
	public UserDTO getUser(String id) {
		return userDAO.getUserList(id);
	}

	@Override
	public void update(UserDTO userDTO) {
		userDAO.update(userDTO);
	}

	@Override
	public void delete(String id) {
		userDAO.delete(id);

	}

}
