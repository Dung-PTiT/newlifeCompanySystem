package company.newlife.service.impl;

import company.newlife.dao.TagDAO;
import company.newlife.entity.CategoryEntity;
import company.newlife.entity.TagEntity;
import company.newlife.model.Tag;
import company.newlife.service.TagService;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagServiceImpl implements TagService {
    @Autowired
    private TagDAO tagDAO;

    @Override
    public void create(Tag tag) {
    }

    @Override
    public Tag get(Integer id) {
        TagEntity tagEntity = tagDAO.get(id);
        Tag tag = new Tag();
        tag.setId(tagEntity.getId());
        tag.setCode(tagEntity.getCode());
        tag.setName(tagEntity.getName());
        return tag;
    }

    @Override
    public List<Tag> getAll() {
        List<TagEntity> tagEntities = tagDAO.getAll();
        if (tagEntities != null) {
            return tagEntities.stream().map(t -> {
                Tag tag = new Tag();
                tag.setId(t.getId());
                tag.setCode(t.getCode());
                tag.setName(t.getName());
                return tag;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public void update(Tag tag) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public PagingResponse<Tag> fetch(PagingRequest request) {
        List<TagEntity> tagEntities = tagDAO.fetch(request);
        PagingResponse<Tag> response = new PagingResponse<>();
        if (tagEntities == null) {
            return null;
        }
        response.setData(tagEntities.stream().map(element -> {
            Tag tag = new Tag();
            tag.setId(element.getId());
            tag.setCode(element.getCode());
            tag.setName(element.getName());
            return tag;
        }).collect(Collectors.toList()));
        response.setDraw(request.getDraw());
        response.setRecordsFiltered(tagEntities.size());
        response.setRecordsTotal((int) tagDAO.count());
        response.setTotalDraw(response.getRecordsFiltered() / request.getLength());
        return response;
    }
}
