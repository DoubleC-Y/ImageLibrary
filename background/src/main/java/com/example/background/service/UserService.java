package com.example.background.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.spring.service.IService;
import com.example.background.model.domain.User;
import com.example.background.model.dto.user.UserLoginRequest;
import com.example.background.model.dto.user.UserQueryRequest;
import com.example.background.model.dto.user.UserRegisterRequest;
import com.example.background.model.vo.user.UserVO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

/**
* @author 10611
* @description 针对表【user(用户)】的数据库操作Service
* @createDate 2026-11-19 17:24:04
*/
public interface UserService extends IService<User> {

    /**
     * 用户注册
     *
     * @param userRegisterRequest 用户注册请求
     * @return 新用户 id
     */
    long userRegister(UserRegisterRequest userRegisterRequest);

    /**
     * 用户登录
     *
     * @param userLoginRequest 用户登录请求
     * @return 登录结果
     */
    UserVO userLogin(UserLoginRequest userLoginRequest, HttpServletRequest request);

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    UserVO getLoginUser(HttpServletRequest request);

    /**
     * 用户登出
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);

    /**
     * 获取用户VO
     *
     * @param user
     * @return
     */
    UserVO getUserVO(User user);

    /**
     * 获取用户VO列表
     *
     * @param userList
     * @return
     */
    List<UserVO> getUserVOList(List<User> userList);

    /**
     * 获取查询条件
     *
     * @param userQueryRequest
     * @return
     */
    QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);

    /**
     * 加密密码
     *
     * @param userPassword
     * @return
     */
    String getEncryptPassword(String userPassword);
}
