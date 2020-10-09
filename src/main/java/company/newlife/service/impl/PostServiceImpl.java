package company.newlife.service.impl;

import company.newlife.dao.PostDAO;
import company.newlife.entity.CategoryEntity;
import company.newlife.entity.PostEntity;
import company.newlife.entity.TagEntity;
import company.newlife.entity.UserEntity;
import company.newlife.model.Category;
import company.newlife.model.Post;
import company.newlife.model.Tag;
import company.newlife.model.User;
import company.newlife.service.PostService;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDAO postDAO;

    @Override
    public void create(Post post) {
        PostEntity postEntity = new PostEntity();
        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setIsActive(post.getActive());
        postEntity.setCreatedDate(post.getCreatedDate());
        postEntity.setLastModifiedDate(post.getLastModifiedDate());
        postEntity.setImagePostUrl(post.getImagePostUrl());
        if (post.getCategory() != null) {
            CategoryEntity categoryEntity = new CategoryEntity();
            categoryEntity.setId(post.getCategory().getId());
            postEntity.setCategoryEntity(categoryEntity);
        }
        if (post.getUser() != null) {
            UserEntity userEntity = new UserEntity();
            userEntity.setId(post.getUser().getId());
            postEntity.setUserEntity(userEntity);
        }
        if (post.getTag() != null) {
            TagEntity tagEntity = new TagEntity();
            tagEntity.setId(post.getTag().getId());
            postEntity.setTagEntity(tagEntity);
        }
        postDAO.create(postEntity);
    }

    @Override
    public Post get(Integer id) {
        PostEntity postEntity = postDAO.get(id);
        Post post = new Post();
        post.setId(postEntity.getId());
        post.setTitle(postEntity.getTitle());
        post.setContent(postEntity.getContent());
        post.setActive(postEntity.getIsActive());
        post.setCreatedDate(postEntity.getCreatedDate());
        post.setLastModifiedDate(postEntity.getLastModifiedDate());
        post.setImagePostUrl(post.getImagePostUrl());
        if (postEntity.getCategoryEntity() != null) {
            Category category = new Category();
            category.setId(postEntity.getCategoryEntity().getId());
            category.setName(postEntity.getCategoryEntity().getName());
            post.setCategory(category);
        }
        if (postEntity.getUserEntity() != null) {
            User user = new User();
            user.setId(postEntity.getUserEntity().getId());
            user.setName(postEntity.getUserEntity().getName());
            user.setRole(postEntity.getUserEntity().getRole());
            post.setUser(user);
        }
        if (postEntity.getTagEntity() != null) {
            Tag tag = new Tag();
            tag.setId(postEntity.getTagEntity().getId());
            tag.setName((postEntity.getTagEntity().getName()));
            post.setTag(tag);
        }
        return post;
    }

    @Override
    public List<Post> getAll() {
        List<PostEntity> postEntities = postDAO.getAll();
        if (postEntities == null) {
            return null;
        }
        return postEntities.stream().map(element -> {
            Post post = new Post();
            post.setId(element.getId());
            post.setTitle(element.getTitle());
            post.setContent(element.getContent());
            post.setActive(element.getIsActive());
            post.setCreatedDate(element.getCreatedDate());
            post.setLastModifiedDate(element.getLastModifiedDate());
            post.setImagePostUrl(element.getImagePostUrl());
            if (element.getCategoryEntity() != null) {
                Category category = new Category();
                category.setId(element.getCategoryEntity().getId());
                category.setCode(element.getCategoryEntity().getCode());
                category.setName(element.getCategoryEntity().getName());
                post.setCategory(category);
            }
            if (element.getUserEntity() != null) {
                User user = new User();
                user.setId(element.getUserEntity().getId());
                user.setName(element.getUserEntity().getName());
                user.setRole(element.getUserEntity().getRole());
                post.setUser(user);
            }
            if (element.getTagEntity() != null) {
                Tag tag = new Tag();
                tag.setId(element.getTagEntity().getId());
                tag.setName((element.getTagEntity().getName()));
                post.setTag(tag);
            }
            return post;
        }).collect(Collectors.toList());
    }

    @Override
    public void update(Post post) {
        PostEntity postEntity = postDAO.get(post.getId());
        if (!postEntity.getTitle().equals(post.getTitle()) && post.getTitle() != null) {
            postEntity.setTitle(post.getTitle());
        }
        if (!postEntity.getContent().equals(post.getContent()) && post.getContent() != null) {
            postEntity.setContent(post.getContent());
        }
        if (!postEntity.getIsActive().equals(post.getActive()) && post.getActive() != null) {
            postEntity.setIsActive(post.getActive());
        }
        if (!postEntity.getCreatedDate().equals(post.getCreatedDate()) && post.getCreatedDate() != null) {
            postEntity.setCreatedDate(post.getCreatedDate());
        }
        if (!postEntity.getLastModifiedDate().equals(post.getLastModifiedDate()) && post.getLastModifiedDate() != null) {
            postEntity.setLastModifiedDate(post.getLastModifiedDate());
        }
        if (!postEntity.getImagePostUrl().equals(post.getImagePostUrl()) && post.getImagePostUrl() != null) {
            postEntity.setImagePostUrl(post.getImagePostUrl());
        }
        postDAO.update(postEntity);
    }

    @Override
    public void delete(Integer id) {
        PostEntity postEntity = postDAO.get(id);
        postDAO.delete(postEntity);
    }

    @Override
    public PagingResponse<Post> fetch(PagingRequest request) {
        List<PostEntity> postEntities = postDAO.fetch(request);
        PagingResponse<Post> response = new PagingResponse<>();
        if (postEntities == null) {
            return null;
        }
        response.setData(postEntities.stream().map(element -> {
            Post post = new Post();
            post.setId(element.getId());
            post.setTitle(element.getTitle());
            post.setContent(element.getContent());
            post.setActive(element.getIsActive());
            post.setCreatedDate(element.getCreatedDate());
            post.setLastModifiedDate(element.getLastModifiedDate());
            post.setImagePostUrl(element.getImagePostUrl());
            if (element.getCategoryEntity() != null) {
                Category category = new Category();
                category.setId(element.getCategoryEntity().getId());
                category.setCode(element.getCategoryEntity().getCode());
                category.setName(element.getCategoryEntity().getName());
                post.setCategory(category);
            }
            if (element.getUserEntity() != null) {
                User user = new User();
                user.setId(element.getUserEntity().getId());
                user.setName(element.getUserEntity().getName());
                user.setRole(element.getUserEntity().getRole());
                post.setUser(user);
            }
            if (element.getTagEntity() != null) {
                Tag tag = new Tag();
                tag.setId(element.getTagEntity().getId());
                tag.setName((element.getTagEntity().getName()));
                post.setTag(tag);
            }
            return post;
        }).collect(Collectors.toList()));
        response.setDraw(request.getDraw());
        response.setRecordsFiltered(postEntities.size());
        response.setRecordsTotal((int) postDAO.count());
        response.setTotalDraw(response.getRecordsFiltered() / request.getLength());
        return response;
    }

    @Override
    public void updateImage(Post post) {
        PostEntity postEntity = postDAO.get(post.getId());
        if (!postEntity.getLastModifiedDate().equals(post.getLastModifiedDate()) && post.getLastModifiedDate() != null) {
            postEntity.setLastModifiedDate(post.getLastModifiedDate());
        }
        if (!postEntity.getImagePostUrl().equals(post.getImagePostUrl()) && post.getImagePostUrl() != null) {
            postEntity.setImagePostUrl(post.getImagePostUrl());
        }
        postDAO.updateImage(postEntity);
    }

    @Override
    public void updateText(Post post) {
        PostEntity postEntity = postDAO.get(post.getId());
        if (!postEntity.getLastModifiedDate().equals(post.getLastModifiedDate()) && post.getLastModifiedDate() != null) {
            postEntity.setLastModifiedDate(post.getLastModifiedDate());
        }
        if (!postEntity.getTitle().equals(post.getTitle()) && post.getTitle() != null) {
            postEntity.setTitle(post.getTitle());
        }
        if (!postEntity.getContent().equals(post.getContent()) && post.getContent() != null) {
            postEntity.setContent(post.getContent());
        }
        if (!postEntity.getIsActive().equals(post.getActive()) && post.getActive() != null) {
            postEntity.setIsActive(post.getActive());
        }
        postDAO.updateText(postEntity);
    }
}
