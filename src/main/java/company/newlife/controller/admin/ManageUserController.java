package company.newlife.controller.admin;

import company.newlife.model.User;
import company.newlife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class ManageUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/manage/user")
    public String goToDashboard() {
        return "admin/users";
    }

    @PostMapping("/manage/user/add-edit")
    public ResponseEntity<String> addUser(@RequestParam String username, @RequestParam String password,
                                          @RequestParam String name, @RequestParam String role,
                                          @RequestParam String address, @RequestParam String email,
                                          @RequestParam String phoneNumber) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String roleUser = userDetails.getAuthorities().toString();
        if (roleUser.contains("ROLE_ADMIN")) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setName(name);
            user.setRole(role);
            user.setAddress(address);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            userService.addUser(user);
            return new ResponseEntity<>("Tạo mới thành công", HttpStatus.OK);
        } else if (roleUser.contains("ROLE_USER")) {
            return new ResponseEntity<>("Không có quyền tạo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PutMapping("/manage/user/add-edit")
    public ResponseEntity<String> addUser(@RequestParam String userID, @RequestParam String username,
                                          @RequestParam String password, @RequestParam String name,
                                          @RequestParam String role, @RequestParam String address,
                                          @RequestParam String email, @RequestParam String phoneNumber) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String roleUser = userDetails.getAuthorities().toString();
        if (roleUser.contains("ROLE_ADMIN")) {
            User user = new User();
            user.setId(Integer.parseInt(userID));
            user.setUsername(username);
            user.setPassword(password);
            user.setName(name);
            user.setRole(role);
            user.setAddress(address);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            userService.updateUser(user);
            return new ResponseEntity<>("Cập nhật thành công", HttpStatus.OK);
        } else if (roleUser.contains("ROLE_USER")) {
            return new ResponseEntity<>("Không có quyền cập nhật", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @DeleteMapping("/manage/user/delete")
    public ResponseEntity<String> addUser(@RequestParam String userID) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String roleUser = userDetails.getAuthorities().toString();
        if (roleUser.contains("ROLE_ADMIN")) {
            userService.deleteUser(Integer.parseInt(userID));
            return new ResponseEntity<>("Xóa tài khoản thành công", HttpStatus.OK);
        } else if (roleUser.contains("ROLE_USER")) {
            return new ResponseEntity<>("Không có quyền tạo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PostMapping("/manage/user/filter-by-role")
    public @ResponseBody
    List<User> getUserByRole(@RequestParam String roleUser) {
        List<User> userList = userService.getByRole(roleUser);
        return userList;
    }

    @PostMapping("/manage/user/getCurrentUser")
    public @ResponseBody
    User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername().trim();
        User user = userService.getByUsername(username);
        return user;
    }

    @PostMapping("/manage/user/get-all")
    public @ResponseBody
    List<User> getAll() {
        List<User> userList = userService.getAll();
        return userList;
    }
}
