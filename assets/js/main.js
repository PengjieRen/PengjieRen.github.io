$(document).ready(function () {
    /* ======= Scrollspy ======= */
    $('body').scrollspy({target: '#page-nav-wrapper', offset: 100});

    /* ======= ScrollTo ======= */
    $('.scrollto').on('click', function (e) {
        //store hash
        var target = this.hash;

        e.preventDefault();

        $('body').scrollTo(target, 800, {offset: -60, axis: 'y'});
    });

    /* ======= Fixed page nav when scrolled ======= */

    $(window).on('scroll resize load', function () {
        $('#page-nav-wrapper').removeClass('fixed');

        var scrollTop = $(this).scrollTop();
        var topDistance = $('#page-nav-wrapper').offset().top;

        if (topDistance > scrollTop) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
        } else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
        }
    });
});

var list1 = $('#list1');
var list2 = $('#list2');

var publications = [
    'Muyang Ma, <strong>Pengjie Ren<em>*</em></strong>, Zhumin Chen, Zhaochun Ren, Huasheng Liang, Jun Ma, Maarten de Rijke. Improving Transformer-based Sequential Recommenders through Preference Editing. Transactions on Information Systems (TOIS), 2021.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Zhaochun Ren, Evangelos Kanoulas, Christof Monz, Maarten de Rijke. Conversations with Search Engines: SERP-based Conversational Response Generation. <em>Transactions on Information Systems (TOIS)</em>, 2021.',
    'Wenchao Sun, Muyang Ma, <strong>Pengjie Ren<sup>*</sup></strong>, Yujie Lin, Zhumin Chen, Jun Ma, Maarten de Rijke. Parallel Split-Join Networks for Shared-account Cross-domain Sequential Recommendations. <em>IEEE Transactions on Knowledge and Data Engineering (TKDE)</em>, 2021 (under review)',
    'Yifan Chen, Yang Wang, <strong>Pengjie Ren</strong>, Meng Wang, Maarten de Rijke. Bayesian Feature Interaction Selection for Factorization Machines. <em>The journal of Artificial Intelligence (AIJ)</em>, 2021. ',
    'Shanshan Wang, <strong>Pengjie Ren</strong>, Zhumin Chen, Zhaochun Ren, Huasheng Liang, Qiang Yan, Evangelos Kanoulas, Maarten de Rijke. Few-Shot Electronic Health Record Coding through Graph Contrastive Learning. <em>arXiv</em>, 2021.',
    'Wanyu Chen, <strong>Pengjie Ren</strong>, Fei Cai, Fei Sun, Maarten de Rijke. Multi-interest Diversification for End-to-end Sequential Recommendation. <em>Transactions on Information Systems (TOIS)</em>, 2021.',
    'Yangjun Zhang, <strong>Pengjie Ren<sup>*</sup></strong> and Maarten de Rijke. A Human-machine Collaborative Framework for Evaluating Malevolence in Dialogues. <em>The Joint Conference of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (ACL-IJCNLP 2021)</em>, Online, August 1-6, 2021.',
    'Zhongkun Liu, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen, Zhaochun Ren, Maarten de Rijke and Ming Zhou. Learning to Ask Conversational Questions by Optimizing Levenshtein Distance. <em>The Joint Conference of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (ACL-IJCNLP 2021)</em>, Online, August 1-6, 2021.',
    'Yangjun Zhang, <strong>Pengjie Ren<sup>*</sup></strong>, Maarten de Rijke. A Taxonomy, Dataset and Benchmark for Detecting and Classifying Malevolent Dialogue Responses. <em>The Journal of the Association for Information Science and Technology (JASIST)</em>, 2021.',
    '<strong>Pengjie Ren</strong>, Zhongkun Liu, Xiaomeng Song, Hongtao Tian, Zhumin Chen, Zhaochun Ren and Maarten de Rijke. Wizard of Search Engine: Access to Information Through Conversations with Search Engines. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Chuan Meng, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen, Zhaochun Ren, Tengxiao Xi and Maarten de Rijke. Initiative-Aware Self-Supervised learning for Knowledge-Grounded Conversations. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Dongdong Li, Zhaochun Ren, <strong>Pengjie Ren</strong>, Zhumin Chen, Miao Fan, Jun Ma and Maarten de Rijke. Few-shot Variational Reasoning for Medical Dialogue Generation. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Zihan Wang, Hongye Song, Zhaochun Ren, <strong>Pengjie Ren</strong>, Zhumin Chen, Xiaozhong Liu, Hongsong Li and Maarten de Rijke. Cross-Domain Contract Element Extraction with a Bi-directional Feedback Clause-Element Relation Network. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Weiwei Sun, Chuan Meng, Qi Meng, Zhaochun Ren, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen and Maarten de Rijke. Conversations Powered by Cross-Lingual Knowledge. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Weiwei Sun, Shuo Zhang, Krisztian Balog, Zhaochun Ren, <strong>Pengjie Ren</strong>, Zhumin Chen and Maarten de Rijke. Simulating User Satisfaction for the Evaluation of Task-oriented Dialogue Systems. <em>The 44th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2021.',
    'Jiahuan Pei, <strong>Pengjie Ren<sup>*</sup></strong> and Maarten de Rijke. A Cooperative Memory Network for Personalized Task-oriented Dialogue Systems with Incomplete User Profiles. <em>The Web Conference (WWW)</em>, 2021.',
    'Qiannan Cheng, Yujie Lin, Zhaochun Ren, <strong>Pengjie Ren</strong>, Zhumin Chen, Xiangyuan Liu and Maarten de Rijke. Long Short-Term Session Search with Joint Document Reranking and Next Query Prediction. <em>The Web Conference (WWW)</em>, 2021.',
    'Qintong Li, Hongshen Chen, Zhaochun Ren, <strong>Pengjie Ren</strong>, Zhaopeng Tu and Zhumin Chen. EmpDG: Multi-resolution Interactive Empathetic Dialogue Generation. <em>The 28th International Conference on Computational Linguistics (COLING)</em>, 2020.',
    'Phillip Lippe, <strong>Pengjie Ren<sup>*</sup></strong>, Hinda Haned, Bart Voorn, Maarten de Rijke. Diversifying Task-oriented Dialogue Response Generation with Prototype Guided Paraphrasing. <em>Natural Language Engineering</em>. (under review)',
    'Wanyu Chen, <strong>Pengjie Ren</strong>, Fei Cai, Fei Sun, Maarten de Rijke. Improving End-to-End Sequential Recommendations with Intent-aware Diversification. <em>The 29th ACM International Conference on Information and Knowledge Management (CIKM)</em>, 2020.',
    'Xiao Huang, <strong>Pengjie Ren</strong>, Zhaochun Ren, Fei Sun, Xiangnan He, Dawei Yin and Maarten de Rijke. Report on the International Workshop on Natural Language Processing for Recommendations (NLP4REC 2020) Workshop held at WSDM 2020. SIGIR Forum, 2020.',
    'Hongshen Chen, Zhaochun Ren, <strong>Pengjie Ren</strong>, Dawei Yin and Xiaodong He.  AIIS: The SIGIR 2020 Workshop on Applied Interactive Information Systems (AIIS 2020).',
    'Yujie Lin, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen, Zhaochun Ren, Dongxiao Yu<sup>*</sup>, Jun Ma, Maarten de Rijke and Xiuzhen Cheng. Meta Matrix Factorization for Federated Rating Predictions. <em> The 43th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2020.',
    'Shanshan Wang, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen<sup>*</sup>, Zhaochun Ren, Jian-Yun Nie, Jun Ma and Maarten de Rijke. Coding Electronic Health Records with Adversarial Reinforcement Path Generation. <em> The 43th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2020.',
    'Nikos Voskarides, Dan Li, <strong>Pengjie Ren</strong>, Evangelos Kanoulas and Maarten de Rijke. Query Resolution for Conversational Search with Limited Supervision. <em> The 43th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2020.',
    'Chuan Meng, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen<sup>*</sup>, Weiwei Sun, Zhaochun Ren, Zhaopeng Tu and Maarten de Rijke. DukeNet: A Dual Knowledge Interaction Network for Knowledge-Grounded Conversation. <em> The 43th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)</em>, 2020.',
    '<strong>Pengjie Ren</strong>, Zhaochun Ren, Fei Sun, Xiangnan He, Dawei Yin and Maarten de Rijke. <a href="https://wsdm2020-nlp4rec.github.io/">The WSDM 2020 Workshop on Natural Language Processing for Recommendations (NLP4REC 2020)</a>.',
    'Minghong Xu, Piji Li, Haoran Yang, <strong>Pengjie Ren</strong>, Zhaochun Ren, Zhumin Chen and Jun Ma. A Neural Topical Expansion Framework for Unstructured Persona-oriented Dialogue Generation. <em>The 24th European Conference on Artificial Intelligence (ECAI 2020)</em>.',
    'Jiahuan Pei, <strong>Pengjie Ren</strong>, Christof Monz and Maarten de Rijke. Retrospective and Prospective Mixture-of-Generators for Task-oriented Dialogue Response Generation. <em>The 24th European Conference on Artificial Intelligence (ECAI 2020)</em>.',
    'Chuan Meng, <strong>Pengjie Ren<sup>*</sup></strong>, Zhumin Chen<sup>*</sup>, Christof Monz, Jun Ma, Maarten de Rijke. <a href="https://arxiv.org/abs/1908.06449">RefNet: A Reference-aware Network for Background Based Conversation.</a> <em>The Thirty-Fourth AAAI Conference on Artificial Intelligence (AAAI)</em>, 2020.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Christof Monz, Jun Ma, Maarten de Rijke. <a href="https://arxiv.org/abs/1908.09528">Thinking Globally, Acting Locally: Distantly Supervised Global-to-Local Knowledge Selection for Background Based Conversation.</a> <em>The Thirty-Fourth AAAI Conference on Artificial Intelligence (AAAI)</em>, 2020.',
    'Shanshan Wang, <strong>Pengjie Ren</strong>,Zhumin Chen, Zhaochun Ren, Jun Ma and Maarten de Rijke. <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/wang-2019-order-free.pdf">Order-free Medicine Combination Prediction With Graph Convolutional Reinforcement Learning.</a> <em>The 28th ACM International Conference on Information and Knowledge Management (CIKM)</em>, 2019.',
    'Yangjun Zhang, <strong>Pengjie Ren</strong>, and Maarten de Rijke.<a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/zhang-2019-improving.pdf">Improving Background Based Conversation with Context-aware Knowledge Pre-selection</a>. In SCAI: IJCAI 2019 Workshop on Search-Oriented Conversational AI. August 2019.',
    'Jiahuan Pei, <strong>Pengjie Ren</strong>, and Maarten de Rijke. <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/pei-2019-modular.pdf">A Modular Task-oriented Dialogue System Using a Neural Mixture-of-Experts.</a> In WCIS: SIGIR 2019 Workshop on Conversational Interaction Systems. ACM, July 2019.',
    'Yifan Chen, <strong>Pengjie Ren</strong>, Yang Wang, and Maarten de Rijke. <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/chen-2019-bayesian.pdf">Bayesian Personalized Feature Interaction Selection for Factorization Machines</a>.<em>    The 42th International ACM SIGIR Conference on Research and    Development in Information Retrieval (SIGIR)</em  >, 2019.',
    'Muyang Ma<sup>#</sup>, <strong>Pengjie Ren<sup>#</sup></strong>, Yujie Lin<sup>#</sup>, Zhumin Chen, Jun Ma, and Maarten de Rijke. <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/ma-2019-pi-net.pdf">π-Net: A Parallel Information-sharing Network for Cross-domain Shared-account Sequential Recommendations.</a> <em>    The 42th International ACM SIGIR Conference on Research and    Development in Information Retrieval (SIGIR)</em  >, 2019.',
    'Meirui Wang, <strong>Pengjie Ren</strong>, Lei Mei, Zhumin Chen, Jun Ma, and Maarten de Rijke. <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/wang-2019-collaborative.pdf">A Collaborative Session-based Recommendation Approach with Parallel Memory Modules.</a><em>    The 42th International ACM SIGIR Conference on Research and    Development in Information Retrieval (SIGIR)</em  >, 2019.',
    'Yujie Lin<sup>#</sup>, <strong>Pengjie Ren<sup>#</sup></strong>, Zhumin Chen, Zhaochun Ren, Jun Ma, and Maarten de Rijke.<a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/lin-2019-improving.pdf"  >Improving Outfit Recommendation with Co-supervision of  Fashion Generation.</a><em> The Web Conference (WWW)</em>, 2019.',
    'Shaojie Jiang, <strong>Pengjie Ren</strong>, Christof Monz, and  Maarten de Rijke.  <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/jiang-2019-improving.pdf"    >Improving Neural Response Diversity with Frequency-Aware    Cross-Entropy Loss.</a  >  <em> The Web Conference (WWW)</em>,  2019.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Jing Li, Zhaochun Ren, Jun Ma, and Maarten de Rijke.  <a href="https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/ren-repeatnet-2019.pdf"    >RepeatNet: A Repeat Aware Neural Recommendation Machine for    Session-based Recommendation.</a  >  <em>    The Thirty-Third AAAI Conference on Artificial Intelligence    (AAAI)</em  >, January 27 – February 1, 2019, Hawaii, USA.',
    'Yujie Lin<sup>#</sup>, <strong>Pengjie Ren<sup>#</sup></strong>, Zhumin Chen, Zhaochun Ren, Jun Ma, and Maarten de Rijke.  <a href="https://arxiv.org/pdf/1806.08977.pdf"    >Explainable fashion recommendation with joint outfit matching    and comment generation.</a  >  <em>    IEEE Transactions on Knowledge and Data Engineering (TKDE)</em  >, 2019',
    'Yupeng Hu, <strong>Pengjie Ren</strong>, Wei Luo, Peng Zhan, and  Xueqing Li  <a href="https://www.sciencedirect.com/science/article/abs/pii/S1389128619300660"    >Multi-resolution representation with recurrent neural    networks application for streaming time series in IoT.</a  >  <em> Computer Networks</em>, Volume 152, 7 April 2019, Pages  114-132.',
    'Lei Mei<sup>#</sup>, <strong>Pengjie Ren<sup>#</sup></strong  >, Zhumin Chen, Liqiang Nie, Jun Ma, and Jian-Yun Nie.  <a href="https://dl.acm.org/citation.cfm?id=3271813"    >An Attentive Interaction Network for Context-aware Recommendations.</a  >  <em>    The 27th ACM International Conference on Information and    Knowledge Management (CIKM)</em  >, 2018.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Zhaochun Ren, Furu  Wei, Liqiang Nie, Jun Ma, and Maarten de Rijke.  <a href="https://dl.acm.org/citation.cfm?id=3200864"    >Sentence Relations for Extractive Summarization with Deep    Neural Networks.</a  >  <em> Transactions on Information Systems (TOIS)</em>, 2018.',
    'Jing Li, <strong>Pengjie Ren</strong>, Zhumin Chen, Zhaochun  Ren, and Jun Ma.  <a href="https://dl.acm.org/citation.cfm?id=3132926"    >Neural Attentive Session-based Recommendation.</a  >  <em>    The 26th ACM Conference on Information and Knowledge    Management (CIKM)</em  >, 2017.  <strong> (Best Paper Runner-up)</strong>',
    'Chuanqi Tan, Furu Wei, <strong>Pengjie Ren</strong>, Weifeng Lv,  and Ming Zhou.  <a href="https://arxiv.org/abs/1704.02788"    >Entity Linking for Queries by Searching Wikipedia    Sentences.</a  >  <em>    Conference on Empirical Methods in Natural Language Processing    (EMNLP)</em  >, 2017.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Zhaochun Ren, Furu  Wei, Jun Ma, and Maarten de Rijke.  <a href="https://dl.acm.org/citation.cfm?id=3080792"    >Leveraging Contextual Sentence Relations for Extractive    Summarization Using a Neural Attention Model.</a  >  <em>    The 40th International ACM SIGIR Conference on Research and    Development in Information Retrieval (SIGIR)</em  >, 2017.',
    'Kaiyuan Cui, <strong>Pengjie Ren</strong>, Zhumin Chen, Tao  Lian, and Jun Ma.  <a href="https://link.springer.com/article/10.1007/s11390-017-1762-7"    >Relation Enhanced Neural Model for Type Classification of    Entity Mentions with A Fine-grained Taxonomy.</a  >  <em> Journal of Computer Science and Technology (JCST)</em>,  2017.',
    '<strong>Pengjie Ren</strong>, Furu Wei, Zhumin Chen, Jun Ma, and  Ming Zhou.  <a href="http://www.aclweb.org/anthology/C16-1004"    >A Redundancy-Aware Sentence Regression Framework for    Extractive Summarization.</a  >  <em>    The 26th International Conference on Computational Linguistics    (COLING)</em  >, 2016.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Jun Ma, Shuaiqiang  Wang, Zhiwei Zhang, and Zhaochun Ren.  <a href="https://www.sciencedirect.com/science/article/pii/S0925231216305537"    >User Session Level Diverse Reranking of Search Results.</a  >  <em> Neurocomputing</em>, 2016.',
    'Zhiwei Zhang, Jingang Wang, Tao Wu,  <strong>Pengjie Ren</strong>, Zhumin Chen, and Luo Si.  <a href="https://link.springer.com/chapter/10.1007/978-3-319-30671-1_5"    >Supervised Local Contexts Aggregation for Effective Session    Search.</a  >  <em> European Conference on Information Retrieval (ECIR)</em>,  2016.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Jun Ma, Shuaiqiang  Wang, Zhiwei Zhang, Zhaochun Ren.  <a href="https://dl.acm.org/citation.cfm?id=2852085"    >Mining and Ranking Users\' Intents behind Queries.</a >  <em> Information Retrieval Journal (IR)</em>, 2015.',
    '<strong>Pengjie Ren</strong>, Zhumin Chen, Jun Ma, Zhiwei Zhang,  Luo Si, Shuaiqiang Wang.  <a href="http://onlinelibrary.wiley.com/doi/10.1002/asi.23578/abstract"    >Detecting Temporal Patterns of User Queries.</a  >  <em>    Journal of the Association for Information Science and    Technology (JASIST)</em  >, 2015.',
    ' <strong>Pengjie Ren</strong>, Peng Liu, Zhumin Chen, Jun Ma,  Xiaomeng Song.  <a href="https://link.springer.com/chapter/10.1007/978-3-319-25255-1_34"    >Learning Similarity Functions for Urban Events Detection by    Mining Hotline Phone Records.</a  >  <em> The 17th Asia-Pacific Web Conference (APWeb)</em>, 2015.',
    'Kai Wu, Jun Ma, Zhumin Chen, <strong>Pengjie Ren</strong>.  <a href="https://link.springer.com/chapter/10.1007/978-3-319-25255-1_15"    >Sleep Quality Evaluation of Active Microblog Users.</a  >  <em> The 17th Asia-Pacific Web Conference (APWeb)</em>, 2015.',
    'Kai Wu, Jun Ma, Zhumin Chen, <strong>Pengjie Ren</strong>.  <a href="https://link.springer.com/chapter/10.1007/978-3-319-25255-1_30"    >Analysis of Subjective City Happiness Index Based on Large    Scale Microblog Data.</a  >  <em> The 17th Asia-Pacific Web Conference (APWeb)</em>, 2015.',
    'Xueqin Sui, Zhumin Chen, Kai Wu, <strong>Pengjie Ren</strong>,  Jun Ma, Fengyu Zhou.<a href="http://tcci.ccf.org.cn/conference/2014/papers/153.pdf"    >Social Media as Sensor in Real World: Geolocate User with    Microblog.</a  ><em> Natural Language Processing and Chinese Computing</em>,  2014.',
    ' <strong>Pengjie Ren</strong>, Zhumin Chen, Jun Ma, Xiaomeng  Song.  <a href="http://link.springer.com/chapter/10.1007%2F978-3-642-41644-6_31"    >Understanding Temporal Intent of User Query Based on    Time-Based Query Classification.</a  >  <em>Natural Language Processing and Chinese Computing</em>,  2013.  <strong> (Best Student Paper)</strong>'
];

for (var i in publications) {
    if (i < 15) list1.append('<li>' + publications[i] + '</li>');
    else list2.append('<li>' + publications[i] + '</li>');
}

function togglePublication(btn) {
    if (list2.css('display') == 'none') {
        list2.fadeIn();
        $(btn).html(
            '<i class="fa fa-chevron-circle-up"></i>&nbsp;Recent publications'
        );
    } else {
        list2.fadeOut();
        $('html, body').animate(
            {scrollTop: $('#publications-section').offset().top - 60},
            500
        );
        $(btn).html(
            '<i class="fa fa-chevron-circle-down"></i>&nbsp;Full publications'
        );
    }
}


function parseList() {
    let papers = []
    list1.children('li').each((index, ele) => {
        let text = $(ele).text()
        if (text.indexOf('under review') >= 0 || text.toLowerCase().indexOf('arxiv') >= 0)
            return
        let paper = buildPaperData(text)
        if (!paper.level) return;
        papers.push(paper)
    })
    list2.children('li').each((index, ele) => {
        let text = $(ele).text()
        if (text.indexOf('under review') >= 0 || text.toLowerCase().indexOf('arxiv') >= 0)
            return
        let paper = buildPaperData(text)
        if (!paper.level) return;
        papers.push(paper)
    })
    comparePaper(papers)
}

function comparePaper(paperList) {
    let copyList = [...paperList]

    //一作a/b
    let list1 = copyList.filter((paper, index) => {
        if (!paper)
            return false
        let flag = paper.levelIndex < 3 && paper.index == 1 && !paper.star && !paper.coFirst
        flag && (delete copyList[index])
        return flag
    })

    //共1 a/b
    let list2 = copyList.filter((paper, index) => {
        if (!paper)
            return false
        let flag = paper.levelIndex < 3 && paper.coFirst
        flag && (delete copyList[index])
        return flag
    })

    //通讯，共通讯a/b
    let list3 = copyList.filter((paper, index) => {
        if (!paper)
            return false
        let flag = paper.levelIndex < 3 && paper.star
        flag && (delete copyList[index])
        return flag
    })

    //普通a/b
    let list4 = copyList.filter((paper, index) => {
        if (!paper)
            return false
        let flag = paper.levelIndex < 3
        flag && (delete copyList[index])
        return flag
    })

    //c
    let list5 = copyList.filter((paper, index) => {
        if (!paper)
            return false
        let flag = paper.levelIndex == 3
        flag && (delete copyList[index])
        return flag
    })

}

function compareYear(paper1, paper2) {
    return paper1.year - paper2.year
}

function compareC(paper1, paper2) {
    let indexFlag = paper1.index - paper2.index
    if (indexFlag !== 0)
        return indexFlag

}


function buildPaperData(text) {
    let conferenceName2Level = {
        'TOIS': 'A',
        'ACL': 'A',
        'JASIST': 'B',
        'SIGIR': 'A',
        'WWW': 'A',
        'COLING': 'B',
        'Neurocomputing': 'C',
        'Natural Language Engineering': 'C',
        'CIKM': 'B',
        'ECAI': 'B',
        'AAAI': 'A',
        'TKDE': 'A',
        'Computer Networks': 'B',
        'EMNLP': 'B',
        'JCST': 'B',
        'ECIR': 'C',
        'Information Retrieval Journal': 'C',
        'APWeb': 'C',
        'Natural Language Processing and Chinese Computing': 'C'
    }
    let paper = {}
    paper.text = text
    let textList = paper.text.split('.')
    paper.authors = textList[0].split(',')
    paper.title = textList[1]
    paper.conference = textList[2]
    let authorIndex = paper.authors.findIndex((author) => {
        return author.indexOf('Pengjie Ren') >= 0
    })
    paper.index = authorIndex + 1
    paper.star = paper.authors[authorIndex].indexOf('*') >= 0
    paper.coFirst = paper.authors[authorIndex].indexOf('#') >= 0
    for (let i = 2013; i < 2022; i++) {
        if (textList[2].indexOf(i + '') >= 0) {
            paper.year = i + ''
            break
        }
    }
    for (let conferenceName in conferenceName2Level) {
        if (paper.text.indexOf(conferenceName) >= 0) {
            paper.level = conferenceName2Level[conferenceName]
            paper.levelIndex = paper.level === 'A' ? 1 : (paper.level === 'B' ? 2 : 3)
            break
        }
    }
    return paper
}

// parseList()
